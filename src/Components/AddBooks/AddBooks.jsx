import React, { Component } from 'react'
import './AddBooks.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loading from '../Loading/Loading'

class AddBooks extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            titlefield : "",
            authorfield : "",
            quantityfield : "",
            showLoading : false
        }
    }
    onChangeTitle = (event) => {
        this.setState({
            titlefield : event.target.value,
        })
    }

    onChangeAuthor = (event) => {
        this.setState({
            authorfield : event.target.value,
        })
    }

    onChangeQuantity = (event) => {
        this.setState({
            quantityfield : event.target.value
        })
    }

    showLoading = (data) => {
        this.setState({ showLoading : data})
    }

    emptyState = () => {
        this.setState({
            titlefield : '',
            authorfield : '',
            quantityfield : ''
        })
    }

    addBooks = () => {
        if(this.state.titlefield !== '' && this.state.authorfield !== '' && this.state.quantityfield !== ''){
            this.emptyState();
            this.showLoading(true);
            const data = {
                book_name : this.state.titlefield,
                author_name : this.state.authorfield,
                quantity : this.state.quantityfield
            }
            fetch('https://library-management-backend.herokuapp.com/api/v1/books/addBooks',{
                method : 'POST',
                body :JSON.stringify(data) ,
                headers : {
                    'Content-Type' : 'application/json',
                    'auth' : localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then((result) => {console.log(result);this.showLoading(false);alert('Book added Successfully.')})
            .then(err => err)
        }
    }

    render() {
        return (
            <div className="addbooks-outerwrap">
                {this.state.showLoading ? <Loading/> : null}
                <p className="addbooks-title">Add a Book</p>
                <div className="addbooksform-container">
                    <form className="addbooks-inputform">
                        <TextField onChange={this.onChangeTitle} value={this.state.titlefield} id="outlined-basic" placeholder="Title" variant="outlined" /><br/>
                        <TextField onChange={this.onChangeAuthor} value ={this.state.authorfield} id="outlined-basic" placeholder="Author" variant="outlined" /><br/>
                        <TextField onChange={this.onChangeQuantity} value  ={this.state.quantityfield} id="outlined-basic" placeholder="Quantity" variant="outlined" /> <br/>
                        <Button onClick={this.addBooks} variant="contained" color="primary">Add Book</Button>
                    </form>
                </div>
            </div>
        )
    }
}
export default AddBooks
