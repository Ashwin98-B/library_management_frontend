import Home from './Layout/Home/Home';
import LoginHome from './Layout/LoginHome/LoginHome';
import {Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import History from './Utils/history';
import React, { Component } from 'react'
import Loading from './Components/Loading/Loading';
// import LoadingScreen from './Components/LoadingScreen/LoadingScreen';

class App extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="App">
        <Router history = {History}>
          <Switch>
            <Route exact path="/" component={LoginHome}/>
            <Route path="/home" component={Home} />
            <Route path='/' component={LoginHome}/>
          </Switch>
        </Router>
    </div>
    )
  }
}

export default App

