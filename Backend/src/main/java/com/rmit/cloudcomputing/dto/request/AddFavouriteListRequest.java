package com.rmit.cloudcomputing.dto.request;

public class AddFavouriteListRequest {
    private String email;
    private String recipeId;

    public AddFavouriteListRequest() {

    }

    public String getEmail() {
        return this.email;
    }

    public String getRecipeId() {
        return this.recipeId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }
}
