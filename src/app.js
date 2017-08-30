import React from 'react';

import configs from 'config'

import { BrowserRouter } from 'react-router-dom'
import { Route/*, Link*/, Switch } from 'react-router-dom'

import ActionCableProvider from 'react-actioncable-provider'

import AuthChecker from 'components/utils/auth-checker'
import CheckForAcls from 'components/utils/auth/check-for-acls'

import Offline from 'components/offline'
import Admin from 'components/admin'
import Dashboard from 'components/dashboard'

import AuthClient from 'clients/auth'

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

    const token = AuthClient.getToken().access_token

    return (
      <BrowserRouter>
        <div id="main-container" className={"wrapper"}>
          <ActionCableProvider url={configs.cable.url + "/?token=" + token}>
            <Switch>
              <Route path="/dashboard" component={AuthChecker(Dashboard)} />
              <Route path="/admin" component={AuthChecker(CheckForAcls(["admin"], Admin))} />
              <Route path="/" component={AuthChecker(Offline, true)} />
            </Switch>
          </ActionCableProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
