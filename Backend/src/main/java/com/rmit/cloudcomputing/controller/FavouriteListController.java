package com.rmit.cloudcomputing.controller;

import com.rmit.cloudcomputing.dto.request.AddFavouriteListRequest;
import com.rmit.cloudcomputing.dto.response.Response;
import com.rmit.cloudcomputing.dto.response.UserRecipesResponse;
import com.rmit.cloudcomputing.service.FavouriteListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/favourite-list")
public class FavouriteListController {
    @Autowired
    private FavouriteListService favouriteListService;

    @PostMapping("/add-favourite-list")
    public Response addFavouriteList(@Valid @RequestBody AddFavouriteListRequest request) {
        return favouriteListService.addFavouriteList(request);
    }

    @GetMapping("/get-favourite-list/{email}")
    public UserRecipesResponse getFavouriteList(@PathVariable("email") String email) {
        return favouriteListService.getFavouriteList(email);
    }

}
