import React, { Component } from 'react'
import './LoginHome.css'
import LoginForm from '../../Components/LoginForm/LoginForm'
import RegisterForm from '../../Components/RegisterForm/RegisterForm'
import {Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class LoginHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount() {
        this.routeChange('login')
    }
    
    routeChange = (route) => {
        this.props.history.push(`/${route}`)
    }
    render() {
        return (
            <div className="outer-wrapper">
                <div className="content content-left">
                    <div>
                        <i class="fas fa-book-reader fa-10x"></i>
                        <p className="head-content">THE <br/>LIBRARY</p>
                    </div>
                </div>
                <div className="content content-right">
                    <Switch>
                        <Route path="/register" render={(props) => (<RegisterForm {...props} onRegisterSuccess={ () => {this.routeChange('login')}}/>)}/>
                        <Route path="/login" component={LoginForm} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default LoginHome
