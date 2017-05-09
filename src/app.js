import React from 'react';

import UserSearcher from './components/users/search';

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
      <div id="main-container">
        <span className="title">Open Business Labs</span>
        <span className="subtitle">Test d'accès à l'API Moodle</span>
        <UserSearcher />
      </div>
    );
  }

  handleClick() {
    this.setState({counter: this.state.counter + 1});
  }
}

export default Main;
