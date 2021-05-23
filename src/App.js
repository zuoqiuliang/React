import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin';
// import {searchStudents} from './services/student';
//  async function text(){
//  let abc= await searchStudents({
//     page:1,
//     limit:10,
//     // key:'123',
//     sex:-1
//   })
//   console.log(abc)
// }
// text()
   
  
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