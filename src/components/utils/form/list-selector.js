import React from "react"

class ListSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      values: []
    }

    this.handleSelectionChange = this.handleSelectionChange.bind(this)
  }

  componentWillMount() {
    this.setValues(this.props)
  }

  componentWillReceiveProps(props) {
    this.setValues(props)
  }

  setValues(props) {
    this.setState({values: props.field.defaultValue})
  }

  render() {
    return (
      <div id={"list-selector-for-" + this.props.field.name}>
        <select onChange={this.handleSelectionChange} defaultValue="-1">
          <option value="-1" selected="selected">{this.props.field.placeholder}</option>
          {this.getAvailableValues().map(value => {
            return <option key={this.props.field.name + "-item-" + value[this.props.field.listKey]} value={value[this.props.field.listKey]}>{value[this.props.field.listValue]}</option>
          })}
        </select>
        {this.getCurrentValues().map(value => {
          return <div key={"list-selector-for-" + this.props.field.name + "-for-" + value.id}>
                   {value.name}
                   &nbsp;&nbsp;<a href="#" onClick={this.handleDeleteItem.bind(this, value.id)}>supprimer</a>
                 </div>
        })}
      </div>
    )
  }

  getAvailableValues() {
    var self=this
    return this.props.field.values.filter(function(v) {
      return self.state.values.indexOf(v[self.props.field.listKey]) === -1
    })
  }

  getCurrentValues() {
    var self=this
    return this.props.field.values.filter(function(v) { 
      return self.state.values.indexOf(v[self.props.field.listKey]) >= 0
    })
  }

  handleSelectionChange(e) {
    var values = this.state.values
    values.push(parseInt(e.target.value, 10))
    this.setState({values: values})

    this.handleChange()
  }

  handleDeleteItem(id, e) {
    e.preventDefault()
    var values = this.state.values
    values.splice(values.indexOf(id), 1)
    this.setState({values: values})

    this.handleChange()
  }

  handleChange() {
    if (this.props.onChange) {
      this.props.onChange({
        target: {
          name: this.props.field.name,
          value: this.state.values
        }
      })
    }
  }

}

export default ListSelector
