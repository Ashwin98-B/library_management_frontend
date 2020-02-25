import React, { Component } from 'react'
import './Home.css'
import Dashboard from '../../Components/Dashboard/Dashboard'
import AddBooks from '../../Components/AddBooks/AddBooks'
import PresentBooks from '../../Components/PresentBooks/PresentBooks'
import {Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import EditStocks from '../../Components/EditStocks/EditStocks'
import BooksOrdered from '../../Components/BooksOrdered/BooksOrdered'


class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            role : 'admin',
            isAdmin : true
        }
        console.log('Home',this.props.location.state);
    }
    
    removeToken(){
        localStorage.removeItem('user_id')
        localStorage.removeItem('role')
        localStorage.removeItem('token')
    }
    
    routeChange = (sub,route) => {
        this.props.history.push(`/${sub}/${route}`, this.props.location.state)
    }

    routeChangeSignout = (route) => {
        this.props.history.push(`/`)
    }

    roleAccordingNavigation = (role) =>{
        let layout = "";
        switch(role) {
            case "USER":
                layout = (
                    <ul className="sidenav-content">
                        <li className="sidenav-btn"><p onClick={()=> this.routeChange('home','books')}>BOOKS</p></li>
                        <li className="sidenav-btn"><p onClick={()=> this.routeChange('home','booksordered')}>BOOKS ORDERED</p></li>
                    </ul>
                )
                return layout;
            case "STAFF":
                layout = (
                    <ul className="sidenav-content">
                        <li className="sidenav-btn"><p onClick={()=> this.routeChange('home','dashboard')}>DASHBOARD</p></li>
                        <li className="sidenav-btn"><p onClick={()=> this.routeChange('home','books')}>BOOKS</p></li>
                        <li className="sidenav-btn"><p onClick={()=> this.routeChange('home','edit')}>EDIT STOCKS</p></li>
                    </ul>
                )
                return layout; 
            default:
                layout = (
                    <ul className="sidenav-content">
                        <li className="sidenav-btn"><p onClick={()=> this.routeChange('home','dashboard')}>DASHBOARD</p></li>
                        <li className="sidenav-btn"><p onClick={()=> this.routeChange('home','addbooks')}>ADD BOOKS</p></li>
                        <li className="sidenav-btn"><p onClick={()=> this.routeChange('home','books')}>BOOKS</p></li>
                        <li className="sidenav-btn"><p onClick={()=> this.routeChange('home','edit')}>EDIT STOCKS</p></li>
                        <li className="sidenav-btn"><p onClick={()=> this.routeChange('home','booksordered')}>BOOKS ORDERED</p></li>
                    </ul>
                )
                return layout;
        }
    }

    render() {
        return (
                <div className="outer-wrapper">
                    <div className="sidenav-wrapper">
                        <p className="home-button">THE LIBRARY</p>
                        { this.props.location.state ? this.roleAccordingNavigation(this.props.location.state.role) : null}
                    </div>

                    <div className="navcontent-wrapper">
                        <div className="topnav-wrapper">
                            <ul className="greeting-wrapper">
                                <li>Welcome, {this.props.location.state.first_name + " " + this.props.location.state.last_name} </li>
                                <Button onClick={() => {this.routeChangeSignout();this.removeToken()}} variant="outlined" color="primary">Sign Out</Button>
                            </ul>
                        </div>
                        <div className="content-wrapper">
                            <Switch>
                                <Route path="/home/dashboard" component={Dashboard}/>
                                <Route path="/home/addbooks" component={AddBooks} />
                                <Route path="/home/books" component={PresentBooks} />
                                <Route path="/home/edit" component={EditStocks} />
                                <Route path="/home/booksordered" component={BooksOrdered} />
                            </Switch>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Home
