package com.rmit.cloudcomputing.controller;

import com.rmit.cloudcomputing.dto.request.SubscribedRecipeRequest;
import com.rmit.cloudcomputing.dto.response.Response;
import com.rmit.cloudcomputing.dto.response.UserRecipesResponse;
import com.rmit.cloudcomputing.service.SubscribedRecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/subscribedRecipe")
public class SubscribedRecipeController {
    @Autowired
    private SubscribedRecipeService subscribedRecipeService;

    @PostMapping("/subscribe-recipe")
    public Response subscribeRecipe(@Valid @RequestBody SubscribedRecipeRequest request) {
        return subscribedRecipeService.subscribeRecipe(request);
    }

    @GetMapping("/get-subscribed-recipe/{email}")
    public UserRecipesResponse setUserSubscribedRecipes(@PathVariable("email") String email) {
        return subscribedRecipeService.getUserSubscribedRecipes(email);
    }

}
