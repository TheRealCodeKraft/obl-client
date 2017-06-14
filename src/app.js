import React from 'react';

import { BrowserRouter } from 'react-router-dom'
import { Route/*, Link*/, Switch } from 'react-router-dom'

import Offline from 'components/offline';
import Dashboard from 'components/dashboard';

/**
 * OBL Main App Container
 **/
class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      counter: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <BrowserRouter>
        <div id="main-container">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
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
