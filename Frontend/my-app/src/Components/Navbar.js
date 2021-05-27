import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AuthenHandler from '../Handlers/AuthenHandler';

class Navbar extends Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    logout() {
        AuthenHandler.logoutHandler(localStorage.getItem("user_email")).then((res) => {
            const data = res.data;
            if(!data.error) {
                localStorage.clear();
                this.props.history.push("/login");
                window.location.reload();
            } else {
                alert("Cannot logout");
            }
        });
    }
    
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item" >
                                <a className="nav-link" href="/user-page">User page</a>
                            </li>
                            <li className="nav-item" >
                                <a className="nav-link" href="/list-query">List/Query</a>
                            </li>
                            <li className="nav-item" >
                                <a className="nav-link" href="/create">Create</a>
                            </li>
                            <li className="nav-item" >
                                <a className="nav-link" href="/subscribed-recipes">Subscribed Recipes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.logout} href="#logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
export default withRouter(Navbar);