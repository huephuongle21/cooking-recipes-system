import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import AuthenHandler from '../Handlers/AuthenHandler';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
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
        const loginDetail = {
            email: this.state.email,
            password: this.state.password
        }
        AuthenHandler.loginHandler(loginDetail).then((res) => {
            const data = res.data;
            if(data.error) {
                this.setState({
                    email: "",
                    password: "",
                    errorMessage: data.message
                })
            } else {
                localStorage.clear();
                localStorage.setItem("user_email", data.userEmail); 
                localStorage.setItem("token", data.token);
                this.props.history.push("/main");
                window.location.reload();
            }
        });
    }

    render() {
        return(
            <React.Fragment>
                <div className="container">
                    <h1>Login</h1>
                    <Form className="form" onSubmit={this.onSubmit}>
                        <Form.Group className="input" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" className="input"
                                placeholder="Email" 
                                name="email" value={this.state.email} 
                                onChange={this.onChange} required/>
                        </Form.Group>

                        <Form.Group className="input" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" className="input"
                                placeholder="Password"
                                name="password" value={this.state.password} 
                                onChange={this.onChange} required/>
                        </Form.Group>
                        {
                            this.state.errorMessage &&
                            <h4 className="alert alert-danger"> {this.state.errorMessage} </h4> 
                        }
                        <button type="submit" className="btn-lg btn-dark">Login</button> 
                        Do not have an account? <a href="/register"> Register here </a>
                    </Form>
                    </div>
            </React.Fragment>
        )
    }
}
export default Login;