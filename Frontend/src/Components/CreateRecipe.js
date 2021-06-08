import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import RecipeHandler from '../Handlers/RecipeHandler';
import Navbar from './Navbar';
import InputField from '../ui/InputField/InputField';
import TextArea from '../ui/TextArea';

class CreateRecipe extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            file: "",
            errorMessage: "",
            isLoading: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
        this.setState({ isLoading: true });
        const recipe = this.state.file;
        recipe.append("title", this.state.title);
        recipe.append("description", this.state.description);
        recipe.append("email", localStorage.getItem("user_email"));

        RecipeHandler.addRecipe(recipe).then((res) => {
            const data = res.data;
            if (data.error) {
                this.setState({
                    title: "",
                    description: "",
                    file: "",
                    errorMessage: data.message,
                    isLoading: false,
                });
            } else {
                alert(data.message);
                window.location.reload();
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="container">
                    <h1 className='my-5'>Create new recipe</h1>
                    <Form onSubmit={this.onSubmit} encType='multipart/form-data' className='d-grid gap-3'>
                        <InputField type="text"
                            title="Title"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                            required
                        />
                        <TextArea rows={4} title="Description" name="description"
                            value={this.state.description} onChange={this.onChange} required />

                        <InputField title='Recipe Image' type="file" onChange={this.onFileChange} name="file" accept="image/jpeg" required />

                        {
                            this.state.errorMessage &&
                            <p className="m-0 danger-text"> {this.state.errorMessage} </p>
                        }
                        <button disabled={this.state.isLoading} type="submit" loader={this.state.isLoading ? "loader" : ""} className="btn ms-auto">Submit</button>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
export default CreateRecipe;