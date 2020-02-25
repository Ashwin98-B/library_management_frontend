import React, { Component } from 'react'
import './RegisterForm.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class RegisterForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            fname : "",
            lname : "",
            email : "",
            pswd : "",
            conpswd : ""

        }
    }

    fnameHandler = (event) =>{
        this.setState({
            fname : event.target.value
        })
    }
    lnameHandler = (event) =>{
        this.setState({
            lname : event.target.value
        })
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
    conpswdHandler = (event) =>{
        this.setState({
            conpswd : event.target.value
        })
    }

    signup = () =>{
        if(this.state.fname !=="" && this.state.lname !=="" && this.state.email !=="" && this.state.pswd !=="" && this.state.conpswd !==""){
            if(this.state.pswd === this.state.conpswd){
                let data = {
                    first_name : this.state.fname,
                    last_name : this.state.lname,
                    email : this.state.email,
                    password : this.state.pswd,
                    role : "USER"
                }
                console.log(JSON.stringify(data))
                fetch("https://library-management-backend.herokuapp.com/api/v1/accounts/signup",{
                    method : 'POST',
                    body : JSON.stringify(data),
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                })
                .then(res => res.json())
                .then((result) => {
                    console.log("This is the response",result)
                    this.props.onRegisterSuccess();
                })
                .catch(err => console.log(err))
            }
            else{
                console.log("Password and Confirm Password mismatch")
            }
        }
        else{
            console.log("Please fill the required details")
        }
    }
    render() {
        return (
            <div className="registerform-container">
                <form className="inputform" action="">
                <TextField onChange={this.fnameHandler} value ={this.state.fname} id="outlined-basic" label="First Name" variant="outlined" required /><br/>
                <TextField onChange={this.lnameHandler} value ={this.state.lname} id="outlined-basic" label="Last Name" variant="outlined" required /><br/>
                <TextField onChange={this.emailHandler} value ={this.state.email} type ="email" id="outlined-basic" label="E-Mail" variant="outlined" required/><br/>
                <TextField onChange={this.pswdHandler} value ={this.state.pswd} type="password" id="outlined-basic" label="Password" variant="outlined" required/><br/>
                <TextField onChange={this.conpswdHandler} value ={this.state.conpswd} type="password" id="outlined-basic" label="Confirm Password" variant="outlined" required/><br/>
                <Button onClick={this.signup} variant="contained" color="primary">Register</Button>
                </form>
            </div>
        )
    }
}

export default RegisterForm
