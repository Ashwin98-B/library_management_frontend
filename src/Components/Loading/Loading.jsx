import React, { Component } from 'react'
import './Loading.css'
export class Loading extends Component {
    render() {
        return (
            <div className="loading-container">
                <p className="loading-content">Loading...</p>
            </div>
        )
    }
}

export default Loading
