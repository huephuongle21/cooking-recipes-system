package com.rmit.cloudcomputing.dto.request;

import org.springframework.web.multipart.MultipartFile;

public class AddRecipeRequest {
    private String email;
    private String title;
    private String description;
    private MultipartFile file;

    public AddRecipeRequest() {

    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public MultipartFile getFile() {
        return file;
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
