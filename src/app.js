import React from 'react';

import { BrowserRouter } from 'react-router-dom'
import { Route/*, Link*/, Switch } from 'react-router-dom'

import AuthChecker from 'components/utils/auth-checker'
import CheckForAcls from 'components/utils/auth/check-for-acls'

import Offline from 'components/offline'
import Admin from 'components/admin'
import Dashboard from 'components/dashboard'

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
            <Route path="/dashboard" component={AuthChecker(Dashboard)} />
            <Route path="/admin" component={AuthChecker(CheckForAcls(["admin"], Admin))} />
            <Route path="/" component={Offline} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
