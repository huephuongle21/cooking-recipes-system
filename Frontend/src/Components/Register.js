import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import UserHandler from '../Handlers/UserHandler';
import InputField from '../ui/InputField/InputField';
import styles from '../scss/auth.module.scss';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            username: "",
            password: "",
            phoneNumber: "",
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
        this.setState({ isLoading: true })
        const newUser = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber
        }
        UserHandler.registerHandler(newUser).then((res) => {
            const data = res.data;
            if (data.error) {
                this.setState({
                    email: "",
                    username: "",
                    password: "",
                    phoneNumber: "",
                    errorMessage: data.message,
                    isLoading: false,
                });
            } else {
                this.props.history.push("/login");
                window.location.reload();
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className='d-flex vh-100'>
                    <div className='flex-1'>
                        <div className='p-md-5 m-md-5 m-3'>
                            <h1 className='mb-5 pb-4'>Create new account</h1>
                            <Form className="d-grid gap-3" onSubmit={this.onSubmit}>
                                <InputField
                                    type="email"
                                    title="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    required
                                />
                                <InputField
                                    type="text"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                    required
                                    title='Username'
                                />
                                <InputField
                                    type="tel"
                                    title="Phone number"
                                    name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.onChange}
                                    pattern="^\+?\d*$"
                                    minLength={12} maxLength={12}
                                    required
                                />
                                <InputField
                                    type="password"
                                    placeholder="Password"
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
                                <button type="submit" className="btn ms-auto" disabled={this.state.isLoading} type="submit" loader={this.state.isLoading ? "loader" : ""}>Register</button>
                                <p className='m-0'>Do not have an account? <a href="/login"> Login here </a></p>
                            </Form>
                        </div>
                    </div>
                    <div className={`${styles.rightSection} flex-1 d-none d-lg-block`}></div>
                </div>
            </React.Fragment>
        )
    }
}
export default Register;