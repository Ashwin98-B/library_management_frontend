import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import './EditStocks.css'
import Modal from '../Modal/Modal'



class EditStocks extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            items : [],
            isShowing : false,
            item : null
        }
    }

    changeShowState = (data) => {
        if(data){
            this.showModal()
        } else {
            this.hideModal()
        }
    }

    
    showModal = (item) =>{
        console.log("-----?",item)
        this.setState({
            isShowing : true,
            item : item
        })
    }

    hideModal = () =>{
        this.setState({
            isShowing : false
        })
    }

    updateQuantity = (item,changeVal)=>{
        fetch('http://192.168.0.104:8080/api/v1/books/updateBook',{
            method : 'POST',
            body : JSON.stringify({ book_id : item.id, quantity : changeVal}),
            headers : {
                'Content-Type' : 'application/json',
                'auth' : localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then((result)=>{console.log(result);this.getBooks();})
        .catch(err => console.log(err))
    }


    getBooks = () => {
        fetch('http://192.168.0.104:8080/api/v1/books/listBooks',{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'auth' : localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then((result)=> {
            this.setState({
                items : result.data
            })
        })
        .catch(err => console.log(err))
    }
    
    componentDidMount(){
        this.getBooks();
    }

    deleteBook = (item) => {
        fetch('http://192.168.0.104:8080/api/v1/books/deleteBook',{
            method : 'POST',
            body : JSON.stringify({id : item.id}),
            headers : {
                'Content-Type' : 'application/json',
                'auth' : localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then((result) => {console.log(result); this.getBooks()})
        .catch(err => console.log(err))
    }
    editStocks = (item, index) =>{
        console.log(item)
        return(
            <div className="presentbooks-card" key ={index}>
                    <div className="book-content">
                        <p className="book-title">{item.book_name}</p>
                        <div className="sub-content">
                            <p className="book-author">Written By : <span className="auth-name"> {item.author_name} </span></p>
                            <p className="book-author">Quantity : <span className="auth-name">{item.quantity}</span></p>
                        </div>
                    </div>
                    <div className="order-btn">
                        <Button onClick={()=>this.showModal(item)} variant="contained" color="primary">EDIT</Button><br/><br/>
                        <Modal value = {this.state.item} show = {this.state.isShowing} manageShowState = {(data) => {this.changeShowState(data)}} quantity ={this.state.item ? this.state.item.quantity : null} updateData = {(item,changeVal) => {this.updateQuantity(item,changeVal)}}/>
                        <Button onClick ={()=>this.deleteBook(item)} variant="contained" color="primary">DELETE</Button>
                    </div>
                </div>
        )
    }
    render() {
        return (
            <div className="present-outerwrap">

                {this.state.items.length > 0 ? this.state.items.map((item, index) => {
                    return this.editStocks(item, index);
                }) : <div className = "loading">Fetching Stocks...</div>
            }
            </div>
        )
    }
}

export default EditStocks
