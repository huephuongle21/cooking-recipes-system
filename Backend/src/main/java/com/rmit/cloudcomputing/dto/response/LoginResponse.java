package com.rmit.cloudcomputing.dto.response;

public class LoginResponse extends Response {
    private String userEmail;
    private String token;

    public LoginResponse() {

    }

    public String getUserEmail() {
        return this.userEmail;
    }

    public void setUserEmail(String email) {
        this.userEmail = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
