package com.rmit.cloudcomputing.dto.response;

public class Response {
    private boolean isError;
    private String message;

    public Response() {

    }

    public Response(boolean isError, String message) {
        this.isError = isError;
        this.message = message;
    }

    public boolean isError() {
        return this.isError;
    }

    public String getMessage() {
        return this.message;
    }

    public void setError(boolean isError) {
        this.isError = isError;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

