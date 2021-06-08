import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import UserHandler from '../Handlers/UserHandler';
import RecipeHandler from '../Handlers/RecipeHandler';
import RecipeItem from './RecipeItem';
import styles from '../scss/recipewrapper.module.scss'

class UserPage extends Component {
    constructor() {
        super()
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
                if (!data.error) {
                    this.setState({
                        username: data.username,
                        phoneNumber: data.phoneNumber,
                        userEmail: data.email
                    });
                }
            })

            RecipeHandler.getUserRecipes(user_email).then((res) => {
                const data = res.data;
                if (!data.error) {
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
            return <Redirect to="/login" />
        }
    }

    changePwd() {
        this.props.history.push('/change-password');
    }

    render() {
        var email = localStorage.getItem("user_email");
        if (email) {
            return (
                <React.Fragment>
                    <Navbar />
                    <div className='container mb-3'>
                        <h1 className='my-5'>Welcome {this.state.username} </h1>
                        <section className='d-md-flex gap-3 my-3 card align-items-center justify-content-between'>
                            <ul className='list-unstyled mb-3 mb-md-0'>
                                <li><b>User email:</b> {this.state.userEmail}</li>
                                <li><b>Username:</b> {this.state.username}</li>
                                <li><b>Phone number:</b> {this.state.phoneNumber}</li>
                            </ul>
                            <button className="btn" onClick={() => this.changePwd()}>Change password</button>
                        </section>
                        <div className={styles.root}>
                            {
                                this.state.errorMessage ? <p className="danger-text"> {this.state.errorMessage} </p> : (
                                    this.state.recipes.map(recipe => <RecipeItem {...recipe} key={recipe.id} />
                                    ))
                            }
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}
export default UserPage;