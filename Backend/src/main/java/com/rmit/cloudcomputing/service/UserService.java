package com.rmit.cloudcomputing.service;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.rmit.cloudcomputing.dto.request.RegisterRequest;
import com.rmit.cloudcomputing.dto.response.UserDetailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private DynamoDB dynamoDB;

    public void addUser(RegisterRequest registerRequest) {
        Table table = dynamoDB.getTable("user");

        String email = registerRequest.getEmail();
        String username = registerRequest.getUsername();
        String phoneNumber = registerRequest.getPhoneNumber();

        Item newUser = new Item()
                .withPrimaryKey("email", email)
                .withString("username", username)
                .withString("phoneNumber", phoneNumber);
        table.putItem(newUser);
    }

    public UserDetailsResponse getUserDetails(String email) {
        UserDetailsResponse response = new UserDetailsResponse(true, "Cannot get user details");
        Table table = dynamoDB.getTable("user");
        Item user = table.getItem("email", email);
        if(user != null) {
            response.setUsername(user.getString("username"));
            response.setPhoneNumber(user.getString("phoneNumber"));
            response.setEmail(email);
            response.setError(false);
            response.setMessage("Get user details successfully");
        }
        return response;
    }
}
