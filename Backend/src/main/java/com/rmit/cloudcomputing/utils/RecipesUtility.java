package com.rmit.cloudcomputing.utils;

import com.amazonaws.services.dynamodbv2.document.*;
import com.amazonaws.services.dynamodbv2.document.spec.ScanSpec;
import com.amazonaws.services.dynamodbv2.model.ResourceNotFoundException;
import com.rmit.cloudcomputing.dto.response.RecipeResponse;
import com.rmit.cloudcomputing.dto.response.UserRecipesResponse;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

@Component
public class RecipesUtility {
    public UserRecipesResponse getUserRecipes(String value, DynamoDB dynamoDB,
                                              String name, boolean getEmail) {
        Table table = dynamoDB.getTable("recipe");
        UserRecipesResponse response = new UserRecipesResponse(true, "No recipes found");
        try {
            HashMap<String, String> nameMap = new HashMap<>();
            HashMap<String, Object> valueMap = new HashMap<>();

            String condition = "#" + name + " = :" + name;
            nameMap.put("#" + name, name);
            valueMap.put(":" + name, value);

            ScanSpec scanSpec = new ScanSpec().withFilterExpression(condition).withNameMap(nameMap)
                    .withValueMap(valueMap);

            ItemCollection<ScanOutcome> items = table.scan(scanSpec);
            List<RecipeResponse> recipes = new ArrayList<>();
            Iterator<Item> iter = items.iterator();
            while (iter.hasNext()) {
                Item item = iter.next();

                // Retrieve image from s3 bucket

                RecipeResponse recipe = new RecipeResponse(item.getString("id"),
                        item.getString("title"), item.getString("date"),
                        item.getString("description"));

                if(getEmail) {
                    recipe.setUserEmail(item.getString("userEmail"));
                }

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
