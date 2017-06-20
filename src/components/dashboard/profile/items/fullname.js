import React from "react"
import BaseItem from "../base-item"

class PIFullname extends BaseItem {

  constructor(props) {
    super(props)

    this.label = "Nom complet"
  }

  getValue() {
    return "Arnaud DRAZEK"
  }

/*
  buildFullContent() {
    return (
      <div>
      </div>
    )
  }
*/
}

export default PIFullname
