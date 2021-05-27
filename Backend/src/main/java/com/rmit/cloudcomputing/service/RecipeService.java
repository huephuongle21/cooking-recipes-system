package com.rmit.cloudcomputing.service;

import com.amazonaws.services.dynamodbv2.document.*;
import com.amazonaws.services.dynamodbv2.document.spec.GetItemSpec;
import com.rmit.cloudcomputing.dto.request.AddRecipeRequest;
import com.rmit.cloudcomputing.dto.response.RecipeResponse;
import com.rmit.cloudcomputing.dto.response.Response;
import com.rmit.cloudcomputing.dto.response.UserRecipesResponse;
import com.rmit.cloudcomputing.utils.RecipesUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class RecipeService {

    @Autowired
    private DynamoDB dynamoDB;

    @Autowired
    private RecipesUtility recipesUtility;

    @Autowired
    private BucketService bucketService;

    public Response addRecipe(AddRecipeRequest recipe) {
        Table table = dynamoDB.getTable("recipe");
        Response response = new Response();
        String id = UUID.randomUUID().toString();
        Date currentTime = new Date();
        DateFormat ausFormat = new SimpleDateFormat("MM/dd/yyyy hh:mm:ss");
        ausFormat.setTimeZone(TimeZone.getTimeZone("Australia/Melbourne"));
        String ausTime  = ausFormat.format(currentTime);
        Item newRecipe = new Item()
                .withPrimaryKey("id", id)
                .withString("userEmail", recipe.getEmail())
                .withString("title", recipe.getTitle())
                .withString("date", ausTime)
                .withString("description", recipe.getDescription());
        try {
            table.putItem(newRecipe);
            if(bucketService.uploadImage(recipe.getFile(), id)) {
                response.setMessage("Recipe added with image");
            } else {
                response.setMessage("Recipe added without image");
            }
            response.setError(false);
        } catch (Exception e) {
            response.setError(true);
            response.setMessage("Cannot add recipe");
        }
        return response;
    }

    public UserRecipesResponse getUserRecipes(String email) {
        return recipesUtility.getUserRecipes(email, dynamoDB, "userEmail", false);
    }

    public UserRecipesResponse queryRecipes(String title) {
        return recipesUtility.getUserRecipes(title, dynamoDB, "title", true);
    }

    public RecipeResponse getRecipeById(String id) {
        Table table = dynamoDB.getTable("recipe");
        GetItemSpec spec = new GetItemSpec().withPrimaryKey("id", id);
        Item recipe = table.getItem(spec);
        return new RecipeResponse(id, recipe.getString("title"),
                recipe.getString("date"), recipe.getString("description"),
                recipe.getString("userEmail"), bucketService.downloadImage(id));
    }
}
