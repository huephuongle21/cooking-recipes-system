package com.rmit.cloudcomputing.controller;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.model.*;
import com.rmit.cloudcomputing.dto.request.ChangePwdRequest;
import com.rmit.cloudcomputing.dto.request.LoginRequest;
import com.rmit.cloudcomputing.dto.response.LoginResponse;
import com.rmit.cloudcomputing.dto.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/authen")
public class AuthenController {
    @Value("${cognito.user.pool.id}")
    private String userPoolId;

    @Value("${cognito.app.client.id}")
    private String appClientId;

    @Autowired
    private AWSCognitoIdentityProvider provider;

    @PostMapping("/login")
    public LoginResponse loginUser(@Valid @RequestBody LoginRequest loginDetails) {
        LoginResponse response = new LoginResponse();
        Map<String,String> params = new HashMap<>();
        String email = loginDetails.getEmail();
        params.put("USERNAME", email);
        params.put("PASSWORD", loginDetails.getPassword());

        AdminInitiateAuthRequest initialRequest = new AdminInitiateAuthRequest()
                .withAuthFlow(AuthFlowType.ADMIN_NO_SRP_AUTH)
                .withAuthParameters(params)
                .withClientId(appClientId)
                .withUserPoolId(userPoolId);
        try {
            AdminInitiateAuthResult result = provider.adminInitiateAuth(initialRequest);
            response.setToken(result.getAuthenticationResult().getAccessToken());
            response.setError(false);
            response.setMessage("Login successfully");
            response.setUserEmail(email);
        } catch(Exception e) {
            response.setError(true);
            response.setMessage("Email or password is incorrect");
        }
        return response;
    }

    @GetMapping("/logout/{email}")
    public Response logoutUser(@PathVariable("email") String email) {
        Response response = new Response(true, "Error when logging out");
        AdminUserGlobalSignOutRequest request = new AdminUserGlobalSignOutRequest()
                .withUsername(email).withUserPoolId(userPoolId);
        try {
            provider.adminUserGlobalSignOut(request);
            response.setError(false);
            response.setMessage("Logout successfully");
        } catch(Exception e) {
            e.printStackTrace();
        }
        return response;
    }

    @PutMapping("/change-password")
    public Response changePassword(@Valid @RequestBody ChangePwdRequest change) {
        Response response = new Response(false, "Change password successfully");
        ChangePasswordRequest request = new ChangePasswordRequest()
                .withAccessToken(change.getToken())
                .withPreviousPassword(change.getOldPassword())
                .withProposedPassword(change.getNewPassword());
        try {
            provider.changePassword(request);
        } catch(NotAuthorizedException e) {
            response.setError(true);
            response.setMessage("Incorrect old password");
        } catch(LimitExceededException e) {
            response.setError(true);
            response.setMessage("Exceeds the limit for changing password");
        }
        return response;
    }
}
