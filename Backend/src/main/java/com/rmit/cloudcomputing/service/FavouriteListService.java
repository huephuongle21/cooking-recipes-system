package com.rmit.cloudcomputing.service;

import com.amazonaws.services.dynamodbv2.document.*;
import com.amazonaws.services.dynamodbv2.document.spec.ScanSpec;
import com.amazonaws.services.dynamodbv2.model.ResourceNotFoundException;
import com.rmit.cloudcomputing.dto.request.AddFavouriteListRequest;
import com.rmit.cloudcomputing.dto.response.RecipeResponse;
import com.rmit.cloudcomputing.dto.response.Response;
import com.rmit.cloudcomputing.dto.response.UserRecipesResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FavouriteListService {

    @Autowired
    private DynamoDB dynamoDB;

    @Autowired
    private RecipeService recipeService;

    private static String tableName = "favourite_list";

    public Response addFavouriteList(AddFavouriteListRequest request) {

        Table table = dynamoDB.getTable(tableName);
        Response response = new Response();
        String id = UUID.randomUUID().toString();
        Item favouriteRecipe = new Item()
                .withPrimaryKey("id", id)
                .withString("userEmail", request.getEmail())
                .withString("recipeId", request.getRecipeId());
        try {
            table.putItem(favouriteRecipe);
            response.setError(false);
            response.setMessage("Recipe added to favourite list");
        } catch (Exception e) {
            response.setError(true);
            response.setMessage("Cannot add recipe to favourite list");
        }
        return response;
    }

    public UserRecipesResponse getFavouriteList(String email) {
        UserRecipesResponse response = new UserRecipesResponse(true, "No recipes found");
        try {
            Table table = dynamoDB.getTable(tableName);
            HashMap<String, String> nameMap = new HashMap<>();
            HashMap<String, Object> valueMap = new HashMap<>();

            String condition = "#userEmail = :userEmail";
            nameMap.put("#userEmail", "userEmail");
            valueMap.put(":userEmail", email);

            ScanSpec scanSpec = new ScanSpec()
                    .withFilterExpression(condition)
                    .withNameMap(nameMap)
                    .withValueMap(valueMap);

            ItemCollection<ScanOutcome> items = table.scan(scanSpec);
            List<RecipeResponse> recipes = new ArrayList<>();
            Iterator<Item> iter = items.iterator();
            while(iter.hasNext()) {
                Item item = iter.next();
                String id = item.getString("recipeId");
                RecipeResponse recipe = recipeService.getRecipeById(id);
                recipes.add(recipe);
            }

            if(recipes.size() != 0) {
                response.setError(false);
                response.setMessage("List of recipes found");
                response.setResponses(recipes);
            }
        } catch (ResourceNotFoundException e) {
            e.printStackTrace();
        }
        return response;
    }

}
