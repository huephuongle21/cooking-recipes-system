package com.rmit.cloudcomputing.dto.request;

public class ChangePwdRequest {
    private String token;
    private String oldPassword;
    private String newPassword;

    public ChangePwdRequest() {

    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }
}
