import React, { Component } from 'react'
import './Dashboard.css'

export class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            totalBooks : 0,
            totalUsers : 0,
            totalOrders : 0,
            userData : [],
            orderData : []
        }
    }
    

    componentDidMount(){
        fetch('https://library-management-backend.herokuapp.com/api/v1/dashboard/getMetaData',{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'auth' : localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            this.setState({
                totalBooks : result.data.totalBooks,
                totalUsers : result.data.totalUsers,
                totalOrders : result.data.totalOrders,
                userData : result.data.usersData,
                orderData : result.data.ordersData
            })
        })
        .catch(err => err)
    }

    memCardMapping = (item, index) => {
        return(
            
                    <div className ="xs-card mem-details"  key={index}>
                        <p><i class="far fa-user"></i>{item.first_name + " " + item.last_name} </p>
                    </div>
        )
    }

    bookOrderMapping = (item, index) =>{
        return(
        
                <div className = "xs-card book-details" key={index}>
                    <p><span>{item.user_name}</span> has ordered <span>{item.book_name} </span></p>
                </div>
        )
    }
    render() {
        return (

            // SMALL CARDS
            <div>
                <div className="cards-container">
                    <div className="cards member-cards">
                        <div className="card-img">
                            <i class="fas fa-book-open fa-4x"></i>
                        </div>
                        <div>
                            <span className="mincard">TOTAL BOOKS</span>
                            <p className="count">{this.state.totalBooks} </p>
                        </div>
                    </div>
                    <div className="cards member-cards">
                        <div className="card-img">
                            <i class="fas fa-users fa-4x"></i>
                        </div>
                        <div>
                            <span className="mincard">TOTAL MEMBERS</span>
                            <p className="count">{this.state.totalUsers} </p>
                        </div>
                    </div>
                    <div className="cards member-cards">
                        <div className="card-img">
                            <i class="fas fa-book fa-4x"></i>
                        </div>
                        <div>
                            <span className="mincard">BOOKS ORDERED</span>
                            <p className="count">{this.state.totalOrders}</p>
                        </div>
                    </div>
                </div>

                {/* BIG CARDS */}
                    <div className="big-cards-container">
                        <div className="big-cards members-name-card">
                        <p className="card-head">MEMBERS</p>
                            {this.state.userData.map((item, index) =>{
                                return this.memCardMapping(item, index)
                            })
                            }
                    </div>
                    <div className="big-cards book-order-card" >
                        <p className="card-head">BOOKS ORDERED</p>
                        {this.state.orderData.map((item, index) =>{
                            return this.bookOrderMapping(item, index)
                        })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
