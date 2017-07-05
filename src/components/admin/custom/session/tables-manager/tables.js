import React from "react"
import { connect } from 'react-redux';

class Tables extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  render() {
    return (
      <div>Tables</div>
    )
  }

}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(Tables)
