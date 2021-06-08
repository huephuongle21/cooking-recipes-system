import axios from "axios";

class RecipeHandler {
    addRecipe(recipe) {
        return axios.post("http://localhost:8080/api/recipe/add-recipe", recipe, {
            headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }

    getUserRecipes(email) {
        return axios.get("http://localhost:8080/api/recipe/user-recipes/" + email, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }

    getRecipesByTitle(title) {
        return axios.get("http://localhost:8080/api/recipe/query-recipe/" + title, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }
}

export default new RecipeHandler();