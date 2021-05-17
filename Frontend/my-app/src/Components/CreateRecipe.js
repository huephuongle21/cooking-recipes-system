import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import RecipeHandler from '../Handlers/RecipeHandler';
import Navbar from './Navbar';

class CreateRecipe extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
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
        const newRecipe = {
            title: this.state.title,
            description: this.state.description,
            email: localStorage.getItem("user_email")
        }
        RecipeHandler.addRecipe(newRecipe).then((res) => {
            const data = res.data;
            if(data.error) {
                this.setState({
                    title: "",
                    description: "",
                    errorMessage: data.message
                });
            } else {
                alert(data.message);
                window.location.reload();
            }
        });
    }
    
    render() {
        return(
            <React.Fragment>
                <Navbar/>
                <div className="container">
                    <h1>Create new recipe</h1>
                    <Form onSubmit={this.onSubmit}> 
                        <div className="form-group">
                            <label className="name">Title</label>
                            <input className="input" type="text" placeholder="Title" name="title" 
                                value={this.state.title} onChange={this.onChange} required/>
                        </div>

                        <div className="form-group">
                            <label className="name">Description</label>
                            <input className="input" type="text" placeholder="Description" name="description" 
                                value={this.state.description} onChange={this.onChange} required/>
                        </div>
                        { 
                            this.state.errorMessage &&
                            <h6 className="alert alert-danger"> {this.state.errorMessage} </h6> 
                        }
                        <button type="submit" className="btn-lg btn-dark btn-block">Submit</button>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
export default CreateRecipe;