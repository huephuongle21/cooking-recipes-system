import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import UserHandler from '../Handlers/UserHandler';
import RecipeHandler from '../Handlers/RecipeHandler';

class Subscription extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: "",
            username: "",
            phoneNumber: "",
            recipes: [],
            errorMessage: ""
        }
        this.changePwd = this.changePwd.bind(this);
    }

    componentWillMount() {
        var user_email = localStorage.getItem("user_email");
        if (user_email) {
            UserHandler.getUserDetails(user_email).then((res) => {
                const data = res.data;
                if(!data.error) {
                    this.setState({
                        username: data.username,
                        phoneNumber: data.phoneNumber,
                        userEmail: data.email
                    });
                }
            })

            RecipeHandler.getUserRecipes(user_email).then((res) => {
                const data = res.data;
                if(!data.error) {
                    this.setState({
                        recipes: data.recipes
                    })
                } else {
                    this.setState({
                        errorMessage: data.message
                    })
                }
            })
        } else {
            return <Redirect to="/login"/>
        }
    }

    changePwd() {
        this.props.history.push('/change-password');
    }

    render() {
        var email = localStorage.getItem("user_email");
        if (email) {
            return(
                <React.Fragment>
                    <Navbar/>
                    <div className="container">
                        <h1>User email: {this.state.userEmail}</h1>
                        <h1>Username: {this.state.username}</h1>
                        <h1>Phone number: {this.state.phoneNumber}</h1>
                    </div>
                    <button className="btn btn-success" onClick={() => this.changePwd()}>Change password</button>
                    <div className="container">
                        {
                            this.state.errorMessage ? <h6 className="alert alert-danger"> {this.state.errorMessage} </h6> :
                            <table className="table" striped bordered hover size="sm" width="100%">
                                <thead>
                                    <tr width="100%">
                                        <th className="th">Title</th>
                                        <th className="th">Date</th>
                                        <th className="th">Description</th>
                                        {/* <th className="th">Artist Image</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.recipes.map(recipe => 
                                        <tr key = {recipe.id} width="100%">
                                            <td> {recipe.title}</td>
                                            <td> {recipe.date}</td>
                                            <td> {recipe.description}</td>
                                            {/* <td><img src={music.object} alt=""/></td> */}
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        }
                        
                    </div>
                </React.Fragment>    
            )
        }
    }
}
export default Subscription;