import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AuthenHandler from '../Handlers/AuthenHandler';
import Bars from '../icons/Bars';
import styles from '../scss/navbar.module.scss';

class Navbar extends Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
        this.state = {
            isSideMenu: false
        }
    }

    logout() {
        AuthenHandler.logoutHandler(localStorage.getItem("user_email")).then((res) => {
            const data = res.data;
            if (!data.error) {
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
            <>
                <nav className={styles.root}>
                    <div className="container d-flex justify-content-between align-items-center">
                        <a href="/user-page" className={styles.logo}>COOK</a>
                        <ul className={`list-unstyled d-lg-flex ${styles.linksWrapper} ${this.state.isSideMenu ? styles.open : ''}`}>
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
                                <a className="nav-link" href="/subscribed-recipes">Favourite Recipes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.logout} href="#logout">Logout</a>
                            </li>
                        </ul>
                        <button className={`${styles.menubtn} d-lg-none d-block`} onClick={() => this.setState({ isSideMenu: true })}><Bars /></button>
                    </div>
                    {this.state.isSideMenu && <div className={styles.blur} onClick={() => this.setState({ isSideMenu: false })}></div>}
                </nav>
            </>
        )
    }
}
export default withRouter(Navbar);