import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SubscribedRecipesHandler from '../Handlers/SubscribedRecipesHandler';
import styles from '../scss/recipewrapper.module.scss'
import RecipeItem from './RecipeItem';

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
                if (data.error) {
                    this.setState({
                        errorMessage: data.message
                    })
                } else {
                    alert(data.message);
                    window.location.reload();
                }
            })
        } else {
            return <Redirect to="/login" />
        }
    }

    render() {
        var user_email = localStorage.getItem("user_email");
        const data = this.props.results;
        console.log(data)
        if (user_email) {
            if (data.length > 0) {
                return (
                    <div className={`${styles.root} mt-5 container`}>
                        { data.map(result => <RecipeItem {...result} key={result.id} onSubscribe={() => this.subscribeRecipe(result.id)} />)}
                    </div>

                )
            } else {
                return (<div></div>);
            }
        } else {
            return <Redirect to="/login" />
        }
    }
}
export default DisplayQueryResult;