import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Form from 'react-bootstrap/Form';
import AuthenHandler from '../Handlers/AuthenHandler';
import InputField from '../ui/InputField/InputField';

class ChangePassword extends Component {
    constructor() {
        super()
        this.state = {
            oldPassword: "",
            newPassword: "",
            errorMessage: "",
            isLoading: false,
        }
        this.onChange = this.onChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    changePassword(e) {
        e.preventDefault();
        this.setState({ errorMessage: '', isLoading: true });
        const changePwdRequest = {
            token: localStorage.getItem("token"),
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        }

        AuthenHandler.changePwdHandler(changePwdRequest)
            .then((res) => {
                const data = res.data;
                if (data.error) {
                    this.setState({
                        oldPassword: "",
                        newPassword: "",
                        errorMessage: data.message,
                        isLoading: false,
                    })
                } else {
                    alert("Password changed");
                    window.location.reload();
                }
            })
            .catch(err => this.setState({ errorMessage: err.response.data.error, isLoading: false }))
    }

    cancel() {
        this.props.history.push('/user-page');
    }

    render() {
        var user_email = localStorage.getItem("user_email");
        if (user_email) {
            return (
                <React.Fragment>
                    <Navbar />
                    {this.renderChangePassword()}
                </React.Fragment>
            )
        } else {
            return <Redirect to="/" />
        }
    }

    renderChangePassword() {
        return (
            <React.Fragment>
                <div className="container">
                    <h1 className='my-5'>Change password</h1>
                    <Form onSubmit={this.changePassword} className='d-grid gap-3'>
                        <InputField
                            type="password"
                            title="Old password"
                            name="oldPassword"
                            value={this.state.oldPassword}
                            onChange={this.onChange}
                            required
                        />
                        <InputField
                            type="password"
                            placeholder="New password"
                            name="newPassword"
                            value={this.state.newPassword}
                            onChange={this.onChange}
                            required
                            minLength={8}
                        />


                        {
                            this.state.errorMessage &&
                            <p className="danger-text m-0"> {this.state.errorMessage} </p>
                        }
                        <div className='d-flex gap-3'>
                            <button className="btn" type="submit" disabled={this.state.isLoading} loader={this.state.isLoading ? "loader" : ""} >Change password</button>
                            <button className="btn btn-danger" type='button' onClick={this.cancel}>Cancel</button>
                        </div>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
export default ChangePassword;