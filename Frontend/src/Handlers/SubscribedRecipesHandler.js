import axios from "axios";

class SubscribedRecipesHandler {
    subscribeRecipe(request) {
        return axios.post("http://localhost:8080/api/favourite-list/add-favourite-list", request, {
            headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }

    getUserSubscribedRecipes(email) {
        return axios.get("http://localhost:8080/api/favourite-list/get-favourite-list/" + email, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }
}

export default new SubscribedRecipesHandler();