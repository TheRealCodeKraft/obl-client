import React from "react"

class Form extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      submitting: false,
      submitError: undefined,
      values: {}
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFormSubmitted = this.handleFormSubmitted.bind(this)
  }

  componentWillMount() {
    var valuesState = {}
    for (var index in this.props.fields) {
      valuesState[this.props.fields[index].name] = this.props.fields[index].defaultValue
    }
    this.setState(valuesState);
  }

  render() {
    return (
      <form id={this.props.id} onSubmit={this.handleFormSubmit}>
        {this.props.fields.map(field => {
          return (
            <label>
              {field.label} : 
              {this.getInput(field)}
              {
                this.state.errors[field.name] !== undefined
                ? <span>{this.state.errors[field.name]}</span>
                : null
              }
              <br />
            </label>
          )
        })}
        {(this.state.submitError) ? [<span>{this.state.submitError}</span>, <br />] : null}
        {this.state.submitting
         ? <span>waiting for response</span>
         : <button type="submit">{this.props.submitLabel}</button>}
      </form>
    )
  }

  getInput(field) {
    var input = null
    switch(field.type) {
      case "checkbox":
        input = <input name={field.name} type={field.type} value={this.state.values[field.name] === true ? "on" : "off"} placeholder={field.placeholder} onChange={this.handleInputChange.bind(this, field)} />
        break
      default:
        input = <input name={field.name} type={field.type} value={this.state.values[field.name]} placeholder={field.placeholder} onChange={this.handleInputChange.bind(this, field)} />
        break
    }
    return input
  }

  handleInputChange(field, e) {
    var values = this.state.values;
    values[e.target.name] = e.target.value

    switch(field.type) {
      case "checkbox":
        values[e.target.name] = (e.target.value === "on" ? false : true)
        break;
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
          this.props.service.client[this.props.service.func](this.state.values, this.handleFormSubmitted)
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

export default Form;