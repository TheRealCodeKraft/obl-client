import React from "react"

class Form extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      submitError: undefined,
      values: {}
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFormSubmitted = this.handleFormSubmitted.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
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
              <input name={field.name} type={field.type} value={this.state.values[field.name]} placeholder={field.placeholder} onChange={this.handleInputChange} />
              {
                this.state.errors[field.name] !== undefined
                ? <span>{this.state.errors[field.name]}</span>
                : null
              }
              <br />
            </label>
          )
        })}
        {this.state.submitError ? [<span>{this.state.submitError}</span>, <br />] : null}
        <button type="submit">{this.props.submitLabel}</button>
      </form>
    )
  }

  handleInputChange(e) {
    var values = this.state.values;
    values[e.target.name] = e.target.value
    this.setState({values: values});
  }

  handleFormSubmit(e) {
    e.preventDefault();

    var errors = this.validate()
    this.setState({errors: errors})
    if (Object.keys(errors).length === 0) {
      if (this.props.service !== undefined) {
        this.props.service.client[this.props.service.func](this.state.values, this.handleFormSubmitted)
      }
      if (this.props.onSubmit) this.props.onSubmit(this.state.values)
    }
  }

  handleFormSubmitted(data) {
    if (!data.error) {
      this.setState({submitError: undefined})
      if (this.props.onSubmitComplete) this.props.onSubmitComplete(data);
    } else {
      this.setState({submitError: data.message})
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
          errors[field.name] = "required"
        }
      }

      if (!errors[field.name]) {
        if (field.confirmFor) {
          if (this.state.values[field.name] !== this.state.values[field.confirmFor]) {
            errors[field.name] = "does not match"
          }
        }
      }
      
    }
    return errors;
  }

}

export default Form;
