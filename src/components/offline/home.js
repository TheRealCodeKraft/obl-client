import React from "react";

import Login from './login';

class Home extends React.Component {

  render() {
    return (

          <div className={"container-center animated slideInDown"}>
                <Login />
          </div>
        
    );
  }

}

export default Home;
