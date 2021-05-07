package com.rmit.cloudcomputing.dto.response;

import java.util.List;

public class UserRecipesResponse extends Response {
    private List<RecipeResponse> recipes;

    public UserRecipesResponse(boolean error, String message) {
        super(error, message);
    }

    public void setResponses(List<RecipeResponse> recipes) {
        this.recipes = recipes;
    }

    public List<RecipeResponse> getRecipes() {
        return recipes;
    }
}
