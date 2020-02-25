import React, { Component } from 'react'
import './PresentBooks.css'
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';

class PresentBooks extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             items : []
        }
    }

    getBooks = () => {
        fetch("http://192.168.0.104:8080/api/v1/books/listBooks",{
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    'auth' : localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then((result) => {
                console.log("Got Result",result)
                this.setState({ items : result.data})
            })
            .then(err => console.log(err))
    }

    componentDidMount(){
        this.getBooks()
    }

    issueDate = () => {
        const date = new Date()
        return(
            <Moment format="DD/MM/YYYY">{date}</Moment>
        )
    }
    returnDate = () => {
        const date = new Date()
        return(
            <Moment add={{ days: 7 }}format="DD/MM/YYYY">{date}</Moment>
        )
    }
    bookOrder = (item) =>{
        let today = new Date();
        let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();

        console.log("Date",item)
        if(item.quantity < 0){
            console.log("Book Out of Stock")
        } else {
            const sentData = {
                user_id : localStorage.getItem('user_id'),
                user_name : localStorage.getItem('name'),
                book_name : item.book_name,
                author_name : item.author_name,
                book_id : item.id,
                quantity : item.quantity - 1,
                issued_date : date,
            }
            fetch('http://192.168.0.104:8080/api/v1/orders/placeOrder',{
                method : 'POST',
                body : JSON.stringify(sentData),
                headers : {
                    'Content-Type' : 'application/json',
                    'auth' : localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then((result) => {console.log("Order placed",result); this.getBooks();})
            .then(err => err)
        }
    }


    getLayout = (item, index) => {
        console.log("Item",item);
        return (
            <div className="presentbooks-card" key={index}>
                <div className="book-content">
                <p className="book-title">{item.book_name}</p>
                    <div className="sub-content">
                        <p className="book-author">Written By : <span className="auth-name"> {item.author_name}</span></p>
                        <p className="book-author">Quantity : <span className="auth-name">{item.quantity}</span></p>
                    </div>
                </div>
                <div className="order-btn">
                    <Button onClick = {() => {this.bookOrder(item)}} variant="contained" color="primary">Order</Button>
                </div>
            </div>
        );
    }
    
    
    render() {
        return (
            <div className="present-outerwrap">
                {this.state.items.length > 0 ? this.state.items.map((item, index) => {
                    return this.getLayout(item, index);
                }) : <div className = "loading">Fetching Books...</div>
            }
            </div>
        )
    }
}

export default PresentBooks
