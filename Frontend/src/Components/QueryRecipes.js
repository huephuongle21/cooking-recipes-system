import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Form from 'react-bootstrap/Form';
import DisplayQueryResult from './DisplayQueryResult';
import RecipeHandler from '../Handlers/RecipeHandler';
import InputField from '../ui/InputField/InputField';

class Query extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            results: [],
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
        if(this.state.title.trim() === '') return;
        this.setState({
            results: [],
            isLoading: true,
            errorMessage: '',
        })
        var user_email = localStorage.getItem("user_email");
        if (user_email) {
            RecipeHandler.getRecipesByTitle(this.state.title).then((res) => {
                const data = res.data;
                if (data.error) {
                    this.setState({
                        errorMessage: data.message,
                        isLoading: false
                    })
                } else {
                    this.setState({
                        results: data.recipes,
                        errorMessage: "",
                        isLoading: false,
                    })
                }
            })
        } else {
            return <Redirect to="/login" />
        }
    }

    render() {
        var user_email = localStorage.getItem("user_email");
        if (user_email) {
            return (
                <React.Fragment>
                    <Navbar />
                    <div className="container">
                        <h1 className='my-5'>Search for Recipe</h1>
                        <Form onSubmit={this.onSubmit} className='d-grid gap-3'>

                            <InputField
                                type="text"
                                title="Title"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange}
                            />

                            {
                                this.state.errorMessage &&
                                <p className="danger-text m-0"> {this.state.errorMessage} </p>
                            }

                            <button disabled={this.state.isLoading} type="submit" loader={this.state.isLoading ? "loader" : ""} type="submit" className="btn ms-auto">Query</button>
                        </Form>
                    </div>
                    <DisplayQueryResult results={this.state.results} />
                </React.Fragment>
            )
        } else {
            return <Redirect to="/login" />
        }
    }
}
export default Query;