package com.rmit.cloudcomputing.controller;

import com.rmit.cloudcomputing.dto.request.AddRecipeRequest;
import com.rmit.cloudcomputing.dto.response.Response;
import com.rmit.cloudcomputing.dto.response.UserRecipesResponse;
import com.rmit.cloudcomputing.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @RequestMapping(value = "/addRecipe", method = RequestMethod.POST)
    public Response addRecipe(@ModelAttribute AddRecipeRequest recipe) {
        return recipeService.addRecipe(recipe);
    }

    @GetMapping("/userRecipes/{email}")
    public UserRecipesResponse getUserRecipes(@PathVariable("email") String email) {
        return recipeService.getUserRecipes(email);
    }

    @GetMapping("/queryRecipe/{title}")
    public UserRecipesResponse getRecipesByTitle(@PathVariable("title") String title) {
        return recipeService.queryRecipes(title);
    }

}
