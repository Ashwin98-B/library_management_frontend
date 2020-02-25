import React, { Component } from 'react'
import './Modal.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Modal extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            quanfield : ''
        }
    }

    quanChange =(event) =>{
        this.setState({
            quanfield : event.target.value
        })
    }
    

    manageState = () => {
        if(this.props.show){
            this.props.manageShowState(false)
        } else {
            this.props.manageShowState(true)
        }
    }

    render() {
        console.log("Show",this.props)
        if(!this.props.show){
            return null
        }
        return (
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span onClick={this.manageState}class="close">&times;</span>
                    <p className="old-quan">Quantity : {this.props.quantity}</p>
                    <TextField value={this.state.quanfield} onChange={this.quanChange} id="outlined-basic" label="Update Quantity" variant="outlined" /><br/><br/>
                    <Button onClick = { () => {this.manageState(); this.props.updateData(this.props.value, this.state.quanfield); }}variant="contained" color="primary">UPDATE</Button>
                </div>
            </div>
        )
    }
}

export default Modal
