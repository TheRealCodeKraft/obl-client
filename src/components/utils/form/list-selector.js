import React from "react"

class ListSelector extends React.Component {

  render() {
    return (
      <div id={"list-selector-for-" + this.props.field.name}>
        <select>
          {this.props.field.values.map(value => {
            return <option key={this.props.field.name + "-item-" + value[this.props.field.listKey]} value={value[this.props.field.key]}>{value[this.props.field.listValue]}</option>
          })}
        </select>
      </div>
    )
  }

}

export default ListSelector
