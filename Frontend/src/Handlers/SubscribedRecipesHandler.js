import axios from "axios";

class SubscribedRecipesHandler {
    subscribeRecipe(request) {
        return axios.post("http://localhost:8080/api/subscribedRecipe/subscribe-recipe", request, {
            headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }

    getUserSubscribedRecipes(email) {
        return axios.get("http://localhost:8080/api/subscribedRecipe/get-subscribed-recipe/" + email, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }
}

export default new SubscribedRecipesHandler();