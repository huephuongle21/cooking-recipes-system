package com.rmit.cloudcomputing.controller;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.model.SignUpRequest;
import com.amazonaws.services.cognitoidp.model.UsernameExistsException;
import com.rmit.cloudcomputing.dto.request.RegisterRequest;
import com.rmit.cloudcomputing.dto.response.Response;
import com.rmit.cloudcomputing.dto.response.UserDetailsResponse;
import com.rmit.cloudcomputing.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private AWSCognitoIdentityProvider provider;

    @Autowired
    private UserService userService;

    @Value("${cognito.app.client.id}")
    private String appClientId;

    @PostMapping("/register")
    public Response registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        Response response = new Response(false, "User added");
        SignUpRequest request = new SignUpRequest().withUsername(registerRequest.getEmail())
                .withPassword(registerRequest.getPassword())
                .withClientId(appClientId);
        try {
            provider.signUp(request);
            userService.addUser(registerRequest);
        } catch(UsernameExistsException e) {
            response.setError(true);
            response.setMessage("Email already exists");
        }
        return response;
    }

    @GetMapping("/user-details/{email}")
    public UserDetailsResponse getUserDetails(@PathVariable("email") String email) {
        return userService.getUserDetails(email);
    }
}
