import React from 'react';
import UsersApi from '../../actions/users';

/**
 * User Entry for User Searcher
 **/
class UserEntry extends React.Component {
  render() {
    return (
      <div className="user-entry">
        <div className="firstname">{this.props.user.firstname}</div>
        <div className="lastname">{this.props.user.lastname}</div>
      </div>
    );
  }
}

/**
 * Base Users searcher
 **/
class UserSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      query: "",
      searching: false,
      users: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  render() {
    return (
      <div className="user-search-container">
        <div className="user-search-form">
          <span className="label">Rechercher un utilisateur par son prénom exact : </span>
          <input type="text" onChange={this.handleChange} />
          <button onClick={this.handleSearch}>Rechercher</button>
        </div>

        <div className="users-list">
          {this.getResult()}
        </div>
      </div>
    );
  }

  getResult() {
    var content = [];
    if (this.state.searching) {
      content.push(<span>Recherche en cours ...</span>);
    } else {
      var list = this.state.users.map(user =>
        <UserEntry key={user.id} user={user} />
      );

      content.push(<span className="title">{list.length == 0 ? "Aucun" : list.length} utilisateur{list.length > 1 ? "s" : ""} trouvé{list.length > 1 ? "s" : ""}</span>);
      content.push(list);
    }
    return content;
  }

  handleChange(e) {
    this.setState({query: e.target.value});
  }

  handleSearch() {
    this.setState({searching: true}, function() {
      console.log("searching : " + this.state.query + " !");
      if (this.state.query == "") {
        this.handleResponse({users: []});
      } else {
        UsersApi.searchFor(this.state.query, this.handleResponse);
      }
    });
  }

  handleResponse(data) {
    console.log("rendering users (" + data.users.length + ")");
    this.setState({users: data.users, searching: false});
  }
}

export default UserSearch;
