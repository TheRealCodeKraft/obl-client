import React from 'react';

import { BrowserRouter } from 'react-router-dom'
import { Route/*, Link*/, Switch } from 'react-router-dom'

import Offline from 'components/offline'
import Dashboard from 'components/dashboard'

import AuthChecker from 'components/utils/auth-checker'

/**
 * OBL Main App Container
 **/
class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUpdate() {
    console.log("update");
  }

  componentWillReceiveProps(props) {
    console.log("uh?");
  }

  render() {
    return (
      <BrowserRouter>
        <div id="main-container">
PAF
          <Switch>
            <Route path="/dashboard" component={AuthChecker(Dashboard)} />
            <Route path="/" component={Offline} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

  handleClick() {
    this.setState({counter: this.state.counter + 1});
  }
}

export default Main;
