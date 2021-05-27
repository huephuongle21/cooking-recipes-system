import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Form from 'react-bootstrap/Form';
import DisplayQueryResult from './DisplayQueryResult';
import RecipeHandler from '../Handlers/RecipeHandler';

class Query extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            results: [],
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
        this.setState({
            results: []
        })
        var user_email = localStorage.getItem("user_email");
        if(user_email) {
            RecipeHandler.getRecipesByTitle(this.state.title).then((res) => {
                const data = res.data;
                if(data.error) {
                    this.setState({
                        errorMessage: data.message
                    })
                } else {
                    this.setState({
                        results: data.recipes,
                        errorMessage: ""
                    })
                }
            })
        } else {
            return <Redirect to="/login"/>
        }
    }

    render() {
        var user_email = localStorage.getItem("user_email");
        if (user_email) {
            return (
                <React.Fragment>
                    <Navbar/>
                    <div className="container">
                        <h1>Query Area</h1>
                        <Form onSubmit={this.onSubmit}> 
                            <div className="form-group">
                                <label className="name">Title</label>
                                <input className="input" type="text" placeholder="Title"
                                    name="title" value={this.state.title} onChange={this.onChange}/>
                            </div>
    
                            { 
                                this.state.errorMessage &&
                                <h6 className="alert alert-danger"> {this.state.errorMessage} </h6> 
                            }

                            <button type="submit" className="btn-lg btn-dark btn-block">Query</button>
                        </Form>
                    </div>
                    <DisplayQueryResult results = {this.state.results} />
                </React.Fragment>
            )
        } else {
            return <Redirect to="/login"/>
        }
    }
}
export default Query;