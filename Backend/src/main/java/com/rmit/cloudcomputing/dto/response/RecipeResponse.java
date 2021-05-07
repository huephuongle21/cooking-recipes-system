package com.rmit.cloudcomputing.dto.response;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "recipe")
public class RecipeResponse {
    private String id;
    private String title;
    private String date;
    private String description;
    private String userEmail;

    public RecipeResponse() {

    }

    public RecipeResponse(String id, String title, String date, String desc) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = desc;
    }

    public RecipeResponse(String id, String title, String date, String desc, String email) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = desc;
        this.userEmail = email;
    }

    @DynamoDBHashKey(attributeName = "id")
    public String getId() {
        return id;
    }

    @DynamoDBAttribute(attributeName = "date")
    public String getDate() {
        return date;
    }

    @DynamoDBAttribute(attributeName = "description")
    public String getDescription() {
        return description;
    }

    @DynamoDBAttribute(attributeName = "title")
    public String getTitle() {
        return title;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @DynamoDBAttribute(attributeName = "userEmail")
    public String getUserEmail() {
        return userEmail;
    }
}
