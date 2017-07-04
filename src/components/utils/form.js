import React from "react"
import { connect } from 'react-redux';

var moment = require("moment")

import * as Clients from 'clients'

import Switch from 'react-bootstrap-switch'
import ListSelector from './form/list-selector'

class Form extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      submitting: false,
      submitError: undefined,
      values: {},
      loadingData: [],
      loadedData: {}
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFormSubmitted = this.handleFormSubmitted.bind(this)
  }

  componentWillMount() {
    var field=undefined, loadingData=[]
    for (var index in this.props.fields) {
      field = this.props.fields[index]
      if (field.values && field.values.targetState !== undefined) {
        Clients[field.values.client][field.values.func]()
        loadingData.push(field)
      }
    }

    if (loadingData.length > 0) {
      this.setState({loadingData: loadingData})
    } else {
      this.loadValuesState()
    }
  }

  componentWillReceiveProps(props) {
    if (this.state.loadingData.length > 0) {
      var loadingData = [], loadedData = this.state.loadedData
      var current = undefined
      for (var index in this.state.loadingData) {
        current = this.state.loadingData[index]
        if (props.reduxState[current.values.targetState][current.values.targetValue]) {
          loadedData[current.name] = props.reduxState[current.values.targetState][current.values.targetValue]
        } else {
          loadingData.push(current)
        } 
      }
      this.setState({loadingData: loadingData, loadedData: loadedData}, function() {
        if (this.state.loadingData.length === 0) {
          this.loadValuesState()
        }
      })
    }
  }

  loadValuesState() {
    var valuesState = {}

    for (var index in this.props.fields) {
      if (this.props.values) {
        valuesState[this.props.fields[index].name] = this.props.values[this.props.fields[index].name]
        if (valuesState[this.props.fields[index].name] instanceof Array) {
          valuesState[this.props.fields[index].name] = valuesState[this.props.fields[index].name].map(value => { return value.id })
        }
      } else {
        valuesState[this.props.fields[index].name] = this.props.fields[index].defaultValue
      }
    }

    this.setState({values: valuesState});
  }

  render() {
    return (
      <form id={this.props.id} onSubmit={this.handleFormSubmit}>
        {this.props.fields.map(field => {
          if (field.displayIf && this.state.values[field.displayIf.name] !== field.displayIf.value) {
            return null
          }

          return (
            <div className="form-group" key={this.props.id + "-field-" + field.name}>
              {field.label} : 
              {this.getInput(field)}
              {
                this.state.errors[field.name] !== undefined
                ? <span>{this.state.errors[field.name]}</span>
                : null
              }
              <br />
            </div>
          )
        })}
        {(this.state.submitError) ? [<span>{this.state.submitError}</span>, <br />] : null}
        {this.state.submitting
         ? <span>waiting for response</span>
         : <button type="submit">{this.props.submitLabel ? this.props.submitLabel : "Enregistrer"}</button>}
      </form>
    )
  }

  getInput(field) {
    var input = null, value = undefined
    switch(field.type) {
      case "checkbox":
        input = <input name={field.name} type={field.type} value={this.state.values[field.name] === true ? "on" : "off"} placeholder={field.placeholder} onChange={this.handleInputChange.bind(this, field)} />
        break
      case "radio":
        var radios = []
        if (field.values) {
          value = undefined
          var radioId = undefined
          for (var index in field.values) {
            value = field.values[index]
            radioId = this.props.id + "-" + field.name + "-" + index
            radios.push(<input key={radioId} id={radioId} name={field.name} type={field.type} value={value.value} onChange={this.handleInputChange.bind(this, field)} checked={this.state.values[field.name] === value.value ? "checked" : ""} />)
            radios.push(<label key={radioId + "_label"} htmlFor={radioId}>{value.label}</label>)
          }
        }
        input = radios
        break
      case "switch":
        input = <Switch name={field.name} onChange={this.handleInputChange.bind(this, field, !this.state.values[field.name])} onText="OUI" offText="NON" defaultValue={this.state.values[field.name]} />
        break
      case "select":
        var options = []
        if (field.values instanceof Array) {
          options = field.values
        } else if (field.values instanceof Object) {
          options = this.state.loadedData[field.name] || []
        }
        input = <select name={field.name} onChange={this.handleInputChange.bind(this, field)} defaultValue={this.state.values[field.name]}>
                  <option value="-1">{field.placeholder}</option>
                  {options.map(value => {
                    return <option value={value[field.key]}>{value[field.value]}</option>
                  })}
                </select>
        break
      case "list-selector":
        var options = []
        if (field.values instanceof Array) {
          options = field.values
        } else if (field.values instanceof Object) {
          options = this.state.loadedData[field.name] || []
        }
        input = <ListSelector field={field} defaultValue={this.state.values[field.name]} options={options} onChange={this.handleInputChange.bind(this, field)} />
        break
      default:
        value = this.state.values[field.name]
        if (value == null) value = ""
        if (field.type === "date" && value !== "") {
          value=moment(value).format("YYYY-MM-DD")
        }
        input = <input name={field.name} type={field.type} value={value} placeholder={field.placeholder} onChange={this.handleInputChange.bind(this, field)} />
        break
    }
    return input
  }

  handleInputChange(field, e) {
    var values = this.state.values;
    var value = e.target ? e.target.value : e
    values[field.name] = value

    switch(field.type) {
      case "checkbox":
        values[field.name] = (value === "on" ? false : true)
        break
      case "radio":
        values[field.name] = (value === "true" ? true : false)
        break
      case "list-selector":
        values[field.name] = value
        break
      default:
        break
    }
    this.setState({values: values});
  }

  handleFormSubmit(e) {
    e.preventDefault();

    var errors = this.validate()
    this.setState({errors: errors})
    if (Object.keys(errors).length === 0) {
      if (this.props.service !== undefined) {
        this.setState({submitting: true, submitError: undefined}, function() {
          if (this.props.entityId !== undefined) {
            this.props.service.client[this.props.service.func](this.props.entityId, this.state.values, this.handleFormSubmitted)
          } else {
            this.props.service.client[this.props.service.func](this.state.values, this.handleFormSubmitted)
          }
        })
      }
      if (this.props.onSubmit) this.props.onSubmit(this.state.values)
    }
  }

  handleFormSubmitted(data) {
    if (!data.error) {
      this.setState({submitError: undefined, submitting: false})
      if (this.props.onSubmitComplete) this.props.onSubmitComplete(data);
    } else {
      this.setState({submitError: data.message !== undefined ? data.message : data.error, submitting: false})
      if (this.props.onSubmitError) this.props.onSubmitError(data);
    }
  }

  validate() {
    var textTypes = ["text", "password", "email"]
    var field = undefined, errors = {};
    for (var index in this.props.fields) {
      field = this.props.fields[index]
      if (field.required) {
        if (textTypes.indexOf(field.type) >= 0 && (this.state.values[field.name] === "" || this.state.values[field.name] === undefined)) {
          errors[field.name] = field.name + "_required"
        }
      }

      if (!errors[field.name]) {
        if (field.confirmFor) {
          if (this.state.values[field.name] !== this.state.values[field.confirmFor]) {
            errors[field.name] = field.name + "_does_not_match"
          }
        }
      }

      if (!errors[field.name]) {
        if (field.wanted) {
          if (this.state.values[field.name] !== field.wanted) {
            errors[field.name] = field.name+ "_waiting_for_" + field.wanted
          }
        }
      }
      
    }
    return errors;
  }

}

function mapStateToProps(state) {
  return {
    reduxState: state
  }
}

export default connect(mapStateToProps)(Form);
