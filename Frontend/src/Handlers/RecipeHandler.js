import axios from "axios";

class RecipeHandler {
    addRecipe(recipe) {
        return axios.post("https://l6cjufwsoj.execute-api.us-east-1.amazonaws.com/stage-1/api/recipe/add-recipe", recipe);
    }

    getUserRecipes(email) {
        return axios.get("https://l6cjufwsoj.execute-api.us-east-1.amazonaws.com/stage-1/api/recipe/user-recipes/" + email);
    }

    getRecipesByTitle(title) {
        return axios.get("https://l6cjufwsoj.execute-api.us-east-1.amazonaws.com/stage-1/api/recipe/query-recipe/" + title);
    }
}

export default new RecipeHandler();