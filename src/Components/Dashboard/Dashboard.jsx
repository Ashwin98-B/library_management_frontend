import React, { Component } from 'react'
import './Dashboard.css'

export class Dashboard extends Component {
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
                            <p className="count">100</p>
                        </div>
                    </div>
                    <div className="cards member-cards">
                        <div className="card-img">
                            <i class="fas fa-users fa-4x"></i>
                        </div>
                        <div>
                            <span className="mincard">TOTAL MEMBERS</span>
                            <p className="count">3</p>
                        </div>
                    </div>
                    <div className="cards member-cards">
                        <div className="card-img">
                            <i class="fas fa-book fa-4x"></i>
                        </div>
                        <div>
                            <span className="mincard">BOOKS ORDERED</span>
                            <p className="count">100</p>
                        </div>
                    </div>
                </div>

                {/* BIG CARDS */}
                <div className="big-cards-container">
                    <div className="big-cards members-name-card">
                        <p className="card-head">MEMBERS</p>
                        <div className ="xs-card mem-details">
                            <p><i class="far fa-user"></i>Anirudh Ravichandran</p>
                        </div>
                    </div>
                    <div className="big-cards book-order-card">
                        <p className="card-head">BOOKS ORDERED</p>
                        <div className = "xs-card book-details">
                            <p><span>Anirudh</span> has ordered <span>Big Robots Ravaging Boots</span></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
