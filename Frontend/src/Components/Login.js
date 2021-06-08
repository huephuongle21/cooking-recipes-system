import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import AuthenHandler from '../Handlers/AuthenHandler';
import InputField from '../ui/InputField/InputField';
import styles from '../scss/auth.module.scss';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
            isLoading: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ isLoading: true, errorMessage: null });
        const loginDetail = {
            email: this.state.email,
            password: this.state.password
        }
        AuthenHandler.loginHandler(loginDetail).then((res) => {
            const data = res.data;
            if (data.error) {
                this.setState({
                    email: "",
                    password: "",
                    errorMessage: data.message,
                    isLoading: false,
                })
            } else {
                localStorage.clear();
                localStorage.setItem("user_email", data.userEmail);
                localStorage.setItem("token", data.token);
                this.props.history.push("/user-page");
                window.location.reload();
            }
        })
    }

    render() {
        return (
            <div className='d-flex vh-100'>
                <div className='flex-1'>
                    <div className='p-md-5 m-md-5 m-3'>
                        <h1 className='mt-0 pb-4 mb-5'>Login</h1>
                        <Form className="d-grid gap-3" onSubmit={this.onSubmit}>
                            <InputField
                                title='Email'
                                type="email" className="input"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                required
                                type='email'
                            />
                            <InputField
                                title='Password'
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                required
                                minLength={6}
                            />

                            {
                                this.state.errorMessage &&
                                <p className="danger-text m-0"> {this.state.errorMessage} </p>
                            }
                            <button disabled={this.state.isLoading} type="submit" loader={this.state.isLoading ? "loader" : ""} className="btn ms-auto">Login</button>
                            <p className='m-0'>Do not have an account? <a href="/register"> Register here </a></p>
                        </Form>
                    </div>
                </div>
                <div className={`${styles.rightSection} flex-1 d-none d-lg-block`}></div>
            </div>
        )
    }
}
export default Login;