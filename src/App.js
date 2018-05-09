import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Record from './pages/Record';
import User from './pages/User';
import AddUser from './pages/AddUser';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
        <div className="App">
            <BrowserRouter>    
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/record' component={Record} />
                    <Route path='/user' component={User} /> 
                    <Route path='/addUser' component={AddUser} />
                </Switch>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;
