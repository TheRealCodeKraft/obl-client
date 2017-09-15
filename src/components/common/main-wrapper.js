import React from 'react'

class MainWrapper extends React.Component {

  render() {
    return (
      <section className={(this.props.config && this.props.config.mainSectionClass) ? this.props.config.mainSectionClass : "content"}>
        {this.props.children}
      </section>
    )
  }

}

export default MainWrapper
