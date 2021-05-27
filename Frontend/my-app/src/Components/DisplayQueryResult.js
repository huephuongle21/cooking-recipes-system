import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SubscribedRecipesHandler from '../Handlers/SubscribedRecipesHandler';

class DisplayQueryResult extends Component {
    constructor(props) {
        super(props)
        this.subscribeRecipe = this.subscribeRecipe.bind(this);
    }

    subscribeRecipe(recipeId) {
        var user_email = localStorage.getItem("user_email");
        if (user_email) {
            const request = {
                email: user_email,
                recipeId: recipeId
            }
            SubscribedRecipesHandler.subscribeRecipe(request).then((res) => {
                const data = res.data;
                if(data.error) {
                    this.setState({
                        errorMessage: data.message
                    })
                } else {
                    alert("Subscribe recipe successfully");
                    window.location.reload();
                }
            })
        } else {
            return <Redirect to="/login"/>
        }
    }

    render() {
        var user_email = localStorage.getItem("user_email");
        const data = this.props.results;
        if (user_email) {
            if(data.length > 0) {
                return(
                    <React.Fragment>
                        <div className="container">
                            <table className="table" width="100%">
                                <thead>
                                    <tr width="100%">
                                        <th className="th">Title</th>
                                        <th className="th">Date</th>
                                        <th className="th">Description</th>
                                        <th className="th">User email</th>
                                        <th className="th">Recipe Image</th>
                                        <th> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    data.map(result => 
                                        <tr key = {result.id} width="100%">
                                            <td> {result.title}</td>
                                            <td> {result.date}</td>
                                            <td> {result.description}</td>
                                            <td> {result.userEmail}</td>
                                            <td><img src={result.image} alt=""/></td>
                                            <td>
                                                <button style={{marginLeft: "10px"}} 
                                                    onClick={() => this.subscribeRecipe(result.id)} 
                                                    className="btn btn-info">Subscribe</button>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </React.Fragment>    
                )
            } else {
                return(<div></div>);
            }
        } else {
            return <Redirect to="/login"/>
        }
    }
}
export default DisplayQueryResult;