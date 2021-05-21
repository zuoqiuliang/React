import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/'  component={Admin}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;