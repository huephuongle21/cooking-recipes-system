import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import UserHandler from '../Handlers/UserHandler';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            username: "",
            password: "",
            phoneNumber: "",
            errorMessage: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber
        }
        UserHandler.registerHandler(newUser).then((res) => {
            const data = res.data;
            if(data.error) {
                this.setState({
                    email: "",
                    username: "",
                    password: "",
                    phoneNumber: "",
                    errorMessage: data.message
                });
            } else {
                this.props.history.push("/login");
                window.location.reload();
            }
        });
    }
    
    render() {
        return(
            <React.Fragment>
                <div className="container">
                    <h1>Create new account</h1>
                    <Form onSubmit={this.onSubmit}> 
                        <div className="form-group">
                            <label className="name">Email</label>
                            <input className="input" type="email" placeholder="Email" name="email" 
                                value={this.state.email} onChange={this.onChange} required/>
                        </div>

                        <div className="form-group">
                            <label className="name">Username</label>
                            <input className="input" type="text" placeholder="Username" name="username" 
                                value={this.state.username} onChange={this.onChange} required/>
                        </div>

                        <div className="form-group">
                            <label className="name">Phone number</label>
                            <input className="input" type="text" placeholder="Phone number" name="phoneNumber" 
                                value={this.state.phoneNumber} onChange={this.onChange} required/>
                        </div>

                        <div className="form-group">
                            <label className="name">Password</label>
                            <input className="input" type="password" placeholder="Password" name="password"
                                value={this.state.password} onChange={this.onChange} required/>
                        </div>
                        { 
                            this.state.errorMessage &&
                            <h6 className="alert alert-danger"> {this.state.errorMessage} </h6> 
                        }
                        <button type="submit" className="btn-lg btn-dark btn-block">Register</button>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
export default Register;