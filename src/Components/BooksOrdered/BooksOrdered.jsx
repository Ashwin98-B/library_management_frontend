import React, { Component } from 'react'
import Moment from 'react-moment';


class BooksOrdered extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            list : [],
            showFetchOrder : true
        }
    }

    componentDidMount(){
        fetch("https://library-management-backend.herokuapp.com/api/v1/orders/listOrders",{
                method : 'POST',
                body : JSON.stringify({user_id : localStorage.getItem('user_id')}),
                headers : {
                    'Content-Type' : 'application/json',
                    'auth' : localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then((result) => {
                console.log("Got Result",result)
                if(result.data.length <= 0) {
                    this.setState({ showFetchOrder : false})
                } else {
                    this.setState({ list : result.data})
                }
            })
            .then(err => console.log(err))
    }

    orderLayout =(item, index) =>{
        const date = new Date();
        return(
            <div className="presentbooks-card" key={index}>
                    <div className="book-content">
                        <p className="book-title">{item.book_name}</p>
                        <div className="sub-content">
                            <p className="book-author">Written By : <span className="auth-name">{item.author_name}</span></p>
                            <p className="book-author">Quantity : <span className="auth-name">{item.quantity}</span></p>
                        </div>
                    </div>
                    <div className="book-issue">
                        <p className="book-title">Issued On</p>
                        <div className="sub-content">
                            <p className="book-author">Date : <span className="auth-name"><Moment format="DD/MM/YYYY">{date}</Moment></span></p>
                        </div>
                    </div>
                </div>
        )
    }
    
    render() {
        return (
            <div className="present-outerwrap">
                {this.state.list.length > 0 ? this.state.list.map((item, index) => {
                    return this.orderLayout(item, index);
                }) :  <div className = "loading">{this.state.showFetchOrder ? "Fetching Orders..." : "No Orders Found"}</div>
            }
            </div>
        )
    }
}

export default BooksOrdered
