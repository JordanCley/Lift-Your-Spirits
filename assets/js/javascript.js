
// AJAX METHODS
var searchIngredient = "";
var queryURLIngredient ="";
var searchDrink = "";
var queryURLDrink ="";
var queryURLQuote ="https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/method=getQuote&key=457653&format=jsonp&lang=en";

// GLOBAL VARIABLES
var drinksArray = [];
console.log(drinksArray);

console.log(queryURLIngredient);

// FUNCTION TO DISPLAY UP TO 10 DRINKS
function displayDrinks(){
  $("#drinkList").empty();
    for(var i = 0;i < drinksArray.length;i ++){
        var drink = $("<li>");
        console.log(drinksArray[i].strDrink);
        drink.text(drinksArray[i].strDrink);
        $("#drinkList").append(drink);
    }
    drinksArray = [];
    console.log(drinksArray);
}

// FUNCTION GRABBING INGREDIENT INPUT SEARCH AND MAKING AJAX CALL
function ingredientSearch(){
    // SUBMIT LISTENER FOR INGREDIENT SEARCH INPUT
   $("#ingredientForm").submit(function(){
    event.preventDefault();
    queryURLIngredient = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
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

function drinkSearch(){
    // SUBMIT LISTENER FOR INGREDIENT SEARCH INPUT
    $("#drinkForm").submit(function(){
    event.preventDefault();
    queryURLDrink = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
    // SELECTING INGREDIENT INPUT FROM FORM
    searchDrink = $("#drink").val().trim();
    // CONCATENATE INGREDIENT AND URL
    queryURLDrink += searchDrink;
    // CALL AJAX FOR INGREDIENT SEARCH
    callDrinkAjax(queryURLDrink);
    console.log(queryURLDrink);
    console.log(searchDrink);
    });
}



// AJAX CALL TO COCKTAIL API
function callDrinkAjax(url) {
  $.ajax({
    url: url,
    method: "GET"
  }).then(function(response) {
    //   LOOP 10 TIMES AND PUSH FIRST 10 DRINKS INTO DRINKSARRAY
    // if (url === queryURLIngredient) {
      console.log(response.drinks.length);
        for(var i = 0; i < response.drinks.length ;i ++){
          console.log(i)
          if(i > 10) {
            break
          
          }
            drinksArray.push(response.drinks[i]);
            console.log(drinksArray);
            
          }
          displayDrinks();
        
        // INGREDIENT SEARCH
      // Returns an array of drinks containing the ingredient matching the searchterm as objects
    //   console.log(response);
      // Returns the first drink in the array
    //   console.log(response.drinks[0]);
      // Returns an image of the drink
    //   console.log(response.drinks[0].strDrinkThumb);
    // } else {
        // DRINK SEARCH
      // Returns an array of drinks matching the searchterm as objects
    //   console.log(response);
      // Returns the first drink in the array
    //   console.log(response.drinks[0]);
      // Returns the instructions for making the drink
    //   console.log(response.drinks[0].strInstructions);
      // Returns the ingredients for making the drink
      // NOTE: The max ingredients in the API is 15
    //   console.log(response.drinks[0].strIngredient1);
    //   console.log(response.drinks[0].strIngredient2);
    //   console.log(response.drinks[0].strIngredient3);
    //   console.log(response.drinks[0].strIngredient4);
    //   console.log(response.drinks[0].strIngredient5);
      // Returns an image of the drink
    //   console.log(response.drinks[0].strDrinkThumb);
    // }
  });
}

function init(){
    ingredientSearch();
    drinkSearch();
}

init();



// callDrinkAjax(queryURLDrink);



