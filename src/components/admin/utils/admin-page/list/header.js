import React from "react"

class AdminPageListHeader extends React.Component {

  render() {
    var header = [], label = undefined
    for (var attrIndex in this.props.attributes) {
      label = this.props.attributes[attrIndex]
      if (label instanceof Object) {
        label = label.label
      }
      header.push(<div key={"header-row-attr-" + attrIndex}>{label}</div>)
    }
    return <div style={{display: "flex"}}>{header}</div>
  }

}

export default AdminPageListHeader
