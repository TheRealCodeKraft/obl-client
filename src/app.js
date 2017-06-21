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
    };

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
}

export default Main;
