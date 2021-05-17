package com.rmit.cloudcomputing.controller;

import com.rmit.cloudcomputing.dto.request.AddRecipeRequest;
import com.rmit.cloudcomputing.dto.response.Response;
import com.rmit.cloudcomputing.dto.response.UserRecipesResponse;
import com.rmit.cloudcomputing.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @PostMapping("/addRecipe")
    public Response addRecipe(@Valid @RequestBody AddRecipeRequest recipe) {
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

    @GetMapping("/allRecipes")
    public UserRecipesResponse getAllRecipes() {
        return recipeService.getAllRecipes();
    }

}
