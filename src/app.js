import React from 'react';

import { BrowserRouter } from 'react-router-dom'
import { Route/*, Link*/, Switch } from 'react-router-dom'

import configs from 'config'

import AuthClient from 'clients/auth'

import AuthChecker from 'components/utils/auth-checker'
import CheckForAcls from 'components/utils/auth/check-for-acls'

import ActionCableProvider from 'react-actioncable-provider'

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

    const token = AuthClient.getToken().access_token

    return (
      <ActionCableProvider url={configs.cable.url + "/?token=" + token}>
        <BrowserRouter>
          <div id="main-container" className={"wrapper"}>
            <Switch>
              <Route path="/dashboard" component={AuthChecker(Dashboard)} />
              <Route path="/admin" component={AuthChecker(CheckForAcls(["admin"], Admin))} />
              <Route path="/" component={Offline} />
            </Switch>
          </div>
        </BrowserRouter>
      </ActionCableProvider>
    );
  }
}

export default Main;
