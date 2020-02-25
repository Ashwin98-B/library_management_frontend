import React, { Component } from 'react'
import './LoginForm.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class LoginForm extends Component {

    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            email : '',
            pswd : ''
        }
    }

    emailHandler = (event) =>{
        this.setState({
            email : event.target.value
        })
    }
    pswdHandler = (event) =>{
        this.setState({
            pswd : event.target.value
        })
    }
    
    routeChange = (route, loginData) =>{
        this.props.history.push(`/${route}`, loginData);
    }

    signin = () => {
        const data = {
            email : this.state.email,
            password : this.state.pswd
        }
        if(this.state.email !== '' && this.state.pswd !== ''){
            fetch("https://library-management-backend.herokuapp.com/api/v1/accounts/login",{
                method : 'POST',
                body : JSON.stringify(data),
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then((result) => {
                localStorage.setItem('user_id',result.data.id)
                localStorage.setItem('role',result.data.role)
                localStorage.setItem('token',result.data.token)
                localStorage.setItem('name', result.data.first_name + " " + result.data.last_name)
                this.routeChange('home', result.data);
            })
            .then(err => console.log(err))
        }
    }

    render() {
        return (
            <div className="loginform-container">
                <form className="inputform" action="">
                    <TextField onChange={this.emailHandler} value={this.state.email} type ="text "id="outlined-basic" label="Username" variant="outlined" required /><br/>
                    <TextField onChange={this.pswdHandler} value={this.state.pswd} type="password" id="outlined-basic" label="Password" variant="outlined" required/><br/>
                    <br/>
                    <p onClick={()=>this.routeChange('register', null)} className="register-btn">Not a User. Register Now</p>
                    <div className="signin-btn">
                        <Button onClick={this.signin} variant="contained" color="primary">Sign In</Button>
                    </div>
                </form> 
            </div>
        )
    }
}

export default LoginForm
