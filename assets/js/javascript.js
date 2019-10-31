
// AJAX METHODS
var searchIngredient = "";//prompt("Insert an ingredient here."); // $("#searchIngredient").val().trim();
var queryURLIngredient ="https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
var searchDrink = "";//prompt("Insert drink name here."); // $("#searchDrink").val().trim();
var queryURLDrink ="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchDrink;
var queryURLQuote ="https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/method=getQuote&key=457653&format=jsonp&lang=en";

// GLOBAL VARIABLES
var drinksArray = [];

console.log(queryURLIngredient);

// FUNCTION TO DISPLAY UP TO 10 DRINKS
function displayDrinks(){
    for(var i = 0;i < drinksArray.length;i ++){
        var drink = $("<li>");
        console.log(drinksArray[i].strDrink);
        drink.text(drinksArray[i].strDrink);
        $("#drinkList").append(drink);
    }
}

// FUNCTION GRABBING INGREDIENT INPUT SEARCH AND MAKING AJAX CALL
function ingredientSearch(){
    // SUBMIT LISTENER FOR INGREDIENT SEARCH INPUT
   $("form").submit(function(){
    event.preventDefault();
    // SELECTING INGREDIENT INPUT FROM FORM
    searchIngredient = $("#ingredient").val().trim();
    // CONCATENATE INGREDIENT AND URL
    queryURLIngredient += searchIngredient;
    // CALL AJAX FOR INGREDIENT SEARCH
    callDrinkAjax(queryURLIngredient);
    console.log(queryURLIngredient);
    console.log(searchIngredient);
   });
}


// AJAX CALL TO COCKTAIL API
function callDrinkAjax(url) {
  $.ajax({
    url: url,
    method: "GET"
  }).then(function(response) {
    //   LOOP 10 TIMES AND PUSH FIRST 10 DRINKS INTO DRINKSARRAY
    if (url === queryURLIngredient) {
        for(var i = 0;i < 10;i ++){
            drinksArray.push(response.drinks[i]);
        }
        console.log(drinksArray);
        displayDrinks();
        
        // INGREDIENT SEARCH
      // Returns an array of drinks containing the ingredient matching the searchterm as objects
    //   console.log(response);
      // Returns the first drink in the array
    //   console.log(response.drinks[0]);
      // Returns an image of the drink
    //   console.log(response.drinks[0].strDrinkThumb);
    } else {
        // DRINK SEARCH
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
    }
  });
}

ingredientSearch();


// callDrinkAjax(queryURLDrink);


// AJAX METHOD FOR DRINK SEARCH
// NOTE: THIS IS NOT WORKING

//$.ajax({
//    url: queryURLQuote,
//    method: "GET"
//}).then(function(response) {
//    Returns an array containing the information of a random quote in an object
//    console.log(response);
//});
