import React from 'react';
import { connect } from 'react-redux'

import configs from 'config'

import { BrowserRouter } from 'react-router-dom'
import { Route/*, Link*/, Switch } from 'react-router-dom'

import ActionCableProvider from 'react-actioncable-provider'

import AuthChecker from 'components/utils/auth-checker'

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
  }

  componentDidMount() {
  }

  render() {

    return (
      <BrowserRouter>
        <div id="main-container" className={"wrapper"}>
          {this.props.token
           ? <ActionCableProvider url={configs.cable.url + "/?token=" + this.props.token.access_token}>
               <Switch>
                 <Route path="/dashboard" component={Dashboard} />
                 <Route path="/admin" component={Admin} />
                 <Route path="/" component={Offline} />
               </Switch>
             </ActionCableProvider>
           : <Switch>
               <Route path="/dashboard" component={Dashboard} />
               <Route path="/admin" component={Admin} />
               <Route path="/" component={Offline} />
             </Switch>}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.authState.token || null
  }
}

export default connect(mapStateToProps)(Main);
