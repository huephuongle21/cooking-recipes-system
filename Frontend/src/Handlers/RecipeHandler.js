import axios from "axios";

class RecipeHandler {
    addRecipe(recipe) {
        return axios.post("http://localhost:8080/api/recipe/addRecipe", recipe, {
            headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }

    getUserRecipes(email) {
        return axios.get("http://localhost:8080/api/recipe/userRecipes/" + email, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }

    getRecipesByTitle(title) {
        return axios.get("http://localhost:8080/api/recipe/queryRecipe/" + title, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }

    getAllRecipes() {
        return axios.get("http://localhost:8080/api/recipe/allRecipes/", {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }
}

export default new RecipeHandler();