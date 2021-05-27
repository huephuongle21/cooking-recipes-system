import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';

class Main extends Component {
    render() {
        var email = localStorage.getItem("user_email");
        if (email) {
            return(
                <React.Fragment>
                    <Navbar/>
                </React.Fragment>
            )
        } else {
            return <Redirect to="/login"/>
        }
    }
}
export default Main;