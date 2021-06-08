import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import SubscribedRecipesHandler from '../Handlers/SubscribedRecipesHandler';
import styles from '../scss/recipewrapper.module.scss'
import RecipeItem from './RecipeItem';

class SubscribedRecipes extends Component {
    constructor() {
        super()
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
                if (!data.error) {
                    this.setState({ recipes: data.recipes });
                }
            })
        } else {
            return <Redirect to="/login" />
        }
    }

    render() {
        var email = localStorage.getItem("user_email");
        if (email) {
            if (this.state.recipes.length <= 0) {
                return (
                    <React.Fragment>
                        <Navbar />
                        <div className="container">
                            <Alert className="alert" variant='danger'>
                                No recipes to display
                            </Alert>
                        </div>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <Navbar />
                        <div className='container mb-3'>
                            <h1 className='my-5'>Favourite Recipes</h1>
                            <div className={`${styles.root}`}>
                                {this.state.recipes.map(recipe => <RecipeItem {...recipe} key={recipe.id} />)}
                            </div>
                        </div>
                    </React.Fragment>
                )
            }
        } else {
            return <Redirect to="/login" />
        }
    }
}
export default SubscribedRecipes;