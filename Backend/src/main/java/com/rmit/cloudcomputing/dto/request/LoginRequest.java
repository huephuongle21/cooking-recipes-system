package com.rmit.cloudcomputing.dto.request;

public class LoginRequest {
    private String email;
    private String password;

    public LoginRequest() {

    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
