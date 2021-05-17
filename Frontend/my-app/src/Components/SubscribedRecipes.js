import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import SubscribedRecipesHandler from '../Handlers/SubscribedRecipesHandler';

class SubscribedRecipes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: [],
            errorMessage: ""
        }
    }

    componentWillMount() {
        var user_email = localStorage.getItem("user_email");
        if (user_email) {
            SubscribedRecipesHandler.getUserSubscribedRecipes(user_email).then((res) => {
                const data = res.data;
                if(!data.error) {
                    this.setState({recipes: data.recipes});
                }
            })
        } else {
            return <Redirect to="/login"/>
        }
    }

    render() {
        var email = localStorage.getItem("user_email");
        if (email) {
            if(this.state.recipes.length <= 0) {
                return (
                    <React.Fragment>
                        <Navbar/>
                        <div className="container">
                            <Alert className="alert" variant='danger'>
                                No recipes to display
                            </Alert>
                        </div>
                    </React.Fragment>
                )
            } else {
                return(
                    <React.Fragment>
                        <Navbar/>
                        <div className="container">
                            {
                                this.state.errorMessage &&
                                <h6 className="alert alert-danger"> {this.state.errorMessage} </h6> 
                            }
                            <table className="table" striped bordered hover size="sm" width="100%">
                                <thead>
                                    <tr width="100%">
                                        <th className="th">Title</th>
                                        <th className="th">Date</th>
                                        <th className="th">Description</th>
                                        <th className="th">User email</th>
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
                                            <td> {recipe.userEmail}</td>
                                            {/* <td><img src={music.object} alt=""/></td> */}
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </React.Fragment>    
                )
            }
        } else {
            return <Redirect to="/login"/>
        }
    }
}
export default SubscribedRecipes;