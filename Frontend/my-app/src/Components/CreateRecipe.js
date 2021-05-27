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
            file: "",
            errorMessage: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onFileChange(e) {
        var data = new FormData();
        data.append("file", e.target.files[0])
        this.setState({
            file: data
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const recipe = this.state.file;
        recipe.append("title", this.state.title);
        recipe.append("description", this.state.description);
        recipe.append("email", localStorage.getItem("user_email"));

        RecipeHandler.addRecipe(recipe).then((res) => {
            const data = res.data;
            if(data.error) {
                this.setState({
                    title: "",
                    description: "",
                    file: "",
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
                    <Form onSubmit={this.onSubmit} enctype='multipart/form-data'> 
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

                        <div className="form-group">
                            <label className="name">Recipe image</label>
                            <input className="input" type="file" onChange={this.onFileChange} name="file" accept="image/jpeg" required/>
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