import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Users from './components/users/Users';
import axios from 'axios';
import './App.css';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/Pages/About';

class  App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }

  // async componentDidMount(){
  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users?client_id=${
  //     process.env.REACT_APP_GITHUB_CLIENT_ID
  //   }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
    
  //   this.setState({ users: res.data, loading: false });
     
  // }
  // search github users
  searchUsers =  async text => {
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
    }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    
    this.setState({ users: res.data.items, loading: false })
  }
  //clear users from state
  clearUsers = () => this.setState({users: [], loading: false})
  
  //setAlert
  setAlert = (msg, type) => {
    this.setState({alert: { msg, type }})

    setTimeout(() => this.setState({alert: null}), 5000)
  }

  render() { 
    const {loading, users} = this.state 

    return (
      <Router>
      <div className='App'>
      <Navbar /*title=" Github Finder" icon="fab fa-github"*//>
      <div className="container">
        <Alert alert={this.state.alert} />
        <Switch>
          <Route 
           exact path= '/' 
           render={props => (
            <Fragment>
              <Search searchUsers={this.searchUsers} 
              clearUsers={this.clearUsers} 
              showClear={users.length > 0 ? true: false}
              setAlert={this.setAlert}
              />
              <Users loading={loading} users={users}/>
            </Fragment>
          )} 
          />
          <Route exact path='/about' component={About} />
        </Switch>
      </div>
      </div>
      </Router>
    )
  }
}

export default App; 
 