package com.rmit.cloudcomputing.dto.request;

public class AddRecipeRequest {
    private String email;
    private String title;
    private String description;

    public AddRecipeRequest() {

    }

    public String getEmail() {
        return this.email;
    }

    public String getTitle() {
        return this.title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
