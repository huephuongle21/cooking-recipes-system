import axios from "axios";

class SubscribedRecipesHandler {
    subscribeRecipe(request) {
        return axios.post("https://l6cjufwsoj.execute-api.us-east-1.amazonaws.com/stage-1/api/favourite-list/add-favourite-list", request);
    }

    getUserSubscribedRecipes(email) {
        return axios.get("https://l6cjufwsoj.execute-api.us-east-1.amazonaws.com/stage-1/api/favourite-list/get-favourite-list/" + email);
    }
}

export default new SubscribedRecipesHandler();