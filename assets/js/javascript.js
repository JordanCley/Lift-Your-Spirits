// AJAX METHODS

var searchIngredient = prompt("Insert an ingredient here.");
// $("#searchIngredient").val().trim();
var queryURLIngredient = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + searchIngredient;
var searchDrink = prompt("Insert drink name here.");
// $("#searchDrink").val().trim();
var queryURLDrink = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchDrink;
var queryURLQuote = "https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/method=getQuote&key=457653&format=jsonp&lang=en";

// AJAX METHOD FOR INGREDIENT SEARCH

$.ajax({
    url: queryURLIngredient,
    method: "GET"
}).then(function(response) {
    // Returns an array of drinks containing the ingredient matching the searchterm as objects
    console.log(response);
    // Returns the first drink in the array
    console.log(response.drinks[0]);
    // Returns an image of the drink
    console.log(response.drinks[0].strDrinkThumb);
});

// AJAX METHOD FOR DRINK SEARCH

$.ajax({
    url: queryURLDrink,
    method: "GET"
}).then(function(response) {
    // Returns an array of drinks matching the searchterm as objects
    console.log(response);
    // Returns the first drink in the array
    console.log(response.drinks[0]);
    // Returns the instructions for making the drink
    console.log(response.drinks[0].strInstructions);
    // Returns the ingredients for making the drink
    // NOTE: The max ingredients in the API is 15
    console.log(response.drinks[0].strIngredient1);
    console.log(response.drinks[0].strIngredient2);
    console.log(response.drinks[0].strIngredient3);
    console.log(response.drinks[0].strIngredient4);
    console.log(response.drinks[0].strIngredient5);
    // Returns an image of the drink
    console.log(response.drinks[0].strDrinkThumb);
});

// AJAX METHOD FOR DRINK SEARCH
// NOTE: THIS IS NOT WORKING

//$.ajax({
//    url: queryURLQuote,
//    method: "GET"
//}).then(function(response) {
//    Returns an array containing the information of a random quote in an object
//    console.log(response);
//});
