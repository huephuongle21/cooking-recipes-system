import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Form from 'react-bootstrap/Form';
import AuthenHandler from '../Handlers/AuthenHandler';

class ChangePassword extends Component {
    constructor() {
        super()
        this.state = {
            oldPassword: "",
            newPassword: "",
            errorMessage: ""
        }
        this.onChange = this.onChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    changePassword() {
        const changePwdRequest = {
            token: localStorage.getItem("token"),
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        }

        AuthenHandler.changePwdHandler(changePwdRequest).then((res) => {
            const data = res.data;
            if(data.error) {
                this.setState({
                    oldPassword: "",
                    newPassword: "",
                    errorMessage: data.message
                })
            } else {
                alert("Password changed");
                window.location.reload();
            }
        });
    }

    cancel() {
        this.props.history.push('/user-page');
    }

    render() {
        var user_email = localStorage.getItem("user_email");
        if (user_email) {
            return (
                <React.Fragment>
                    <Navbar/>
                    {this.renderChangePassword()}
                </React.Fragment>
            )
        } else {
            return <Redirect to="/"/>
        }
    }

    renderChangePassword() {
        return (
            <React.Fragment>
                <div className="container">
                    <h1>Change password</h1>
                    <Form onSubmit={this.changePassword}> 
                        <div className="form-group">
                            <label className="name">Old password</label>
                            <input className="input" type="password" placeholder="Old password" name="oldPassword" 
                                value={this.state.oldPassword} onChange={this.onChange} required/>
                        </div>

                        <div className="form-group">
                            <label className="name">New password</label>
                            <input className="input" type="password" placeholder="New password" name="newPassword" 
                                value={this.state.newPassword} onChange={this.onChange} required/>
                        </div>
                        { 
                            this.state.errorMessage &&
                            <h6 className="alert alert-danger"> {this.state.errorMessage} </h6> 
                        }
                        <button className="btn btn-success" type="submit" >Change password</button>
                        <button className="btn btn-danger" onClick={this.cancel} style={{marginLeft: "10px"}}>Cancel</button>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
export default ChangePassword;