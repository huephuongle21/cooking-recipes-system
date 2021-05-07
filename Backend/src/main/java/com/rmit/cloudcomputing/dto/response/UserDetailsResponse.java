package com.rmit.cloudcomputing.dto.response;

public class UserDetailsResponse extends Response {
    private String email;
    private String username;
    private String phoneNumber;

    public UserDetailsResponse() {

    }

    public UserDetailsResponse(boolean isError, String message) {
        super(isError, message);
    }

    public String getEmail() {
        return this.email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
