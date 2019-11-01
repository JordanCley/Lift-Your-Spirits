// AJAX METHODS
var searchIngredient = "";
var queryURLIngredient = "";
var searchDrink = "";
var queryURLDrink = "";
var queryURLQuote = "https://quote-garden.herokuapp.com/quotes/random";

// GLOBAL VARIABLES
var drinksArray = [];
var chosenDrink = "";
var ingredientArray = [];
var finalIngredients = [];
var searchDisplay = $("#searchDisplay").hide();
var brandDisplay = $("#brandDisplay").hide();
var drinkListDisplay = $("#drinkListDisplay").hide();
var drinkBioDisplay = $("#drinkBioDisplay").hide();

// console.log(drinksArray);
// console.log(queryURLIngredient);

function reSearch() {
  $("#searchAgain").on("click", function() {
    $("body").css(
      "background-image",
      "url(/assets/css/images/wineGlassClear.jpg)"
    );
    drinkBioDisplay.hide();
    searchDisplay.show();
    brandDisplay.show();
  });
}

// ADD CLICK EVENT TO LIST OF DRINKS
function chooseDrink() {
  $(".drinks").on("click", function() {
    $("body").css("background-image", "url(/assets/css/images/backWood.jpg)");
    drinkListDisplay.hide();
    drinkBioDisplay.show();
    chosenDrink = $(this)
      .text()
      .trim();
    queryURLDrink = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${chosenDrink}`;
    // queryURLDrink += chosenDrink;
    // console.log(queryURLDrink)
    callAjax(queryURLDrink);
    callAjax(queryURLQuote);
    // console.log(queryURLDrink);
    // console.log(chosenDrink);
    // console.log(drinksArray[drinks][0]);
  });
}

// STRIPPING DOWN DRINK PROPERTIES TO ISOLATE strIngredient
function stripIngredients() {
  // FOR IN LOOP LOOPING THROUGH OBJECTS
  // var newArray = Object.values(drinksArray);
  // console.log("New array below");
  // console.log(newArray)
  // console.log("this is the values " + newArray[0]);
  for (var key in drinksArray[0]) {
    var value = drinksArray[0][key];
    // IF NOT NULL
    if (value != null) {
      // PUSH INTO NEW ARRAY
      ingredientArray.push([key, value]);
      // console.log(ingredientArray)
      console.log(ingredientArray[0][0]);
    }
  }
}

// LOOP THROUGH INGREDIENT ARRAY
function stripInstructions() {
  for (var i = 0; i < ingredientArray.length; i++) {
    // console.log(ingredientArray[i]);
    // console.log("strIngredient" + i)
    // IF EQUAL TO 14 AND 15 CHARS
    if (ingredientArray[i].length >= 14 && ingredientArray[i].length <= 15) {
      // PUSH INTO NEW ARRAY
      finalIngredients.push(ingredientArray[i]);
    }
  }
}

// DISPLAY PROPERTIES OF CHOSEN DRINK
function displayChosenDrink() {
  var image = drinksArray[0].strDrinkThumb;
  $("#drinkName").text(drinksArray[0].strDrink);
  $("#instructions").text(drinksArray[0].strInstructions);
  $("img").attr("src", image);
  reSearch();
  stripIngredients();
  stripInstructions();
  for (var i = 0; i < finalIngredients.length; i++) {
    if (finalIngredients[i] != "strInstructions") {
      var combine = finalIngredients[i];

      // console.log(combine);
      // console.log(drinksArray[0].strIngredient1);

      // ****** STUCK HERE ********
    }
  }
}

// FUNCTION TO DISPLAY UP TO 10 DRINKS
function displayDrinks() {
  $("body").css("background-image", "url(/assets/css/images/wood.jpg)");
  $("#drinkList").empty();
  for (var i = 0; i < drinksArray.length; i++) {
    var drink = $("<li>");
    // console.log(drinksArray[i].strDrink);
    drink.text(drinksArray[i].strDrink);
    drink.addClass("drinks");
    $("#drinkList").append(drink);
  }
  // console.log(drinksArray);
  drinksArray = [];
  chooseDrink();
}

// FUNCTION DISPLAYING QUOTE
function displayQuote(response) {
  $("#quoteText").empty();
  $("#quoteText").text('"' + response.quoteText + '"');
  $("#quoteAuthor").empty();
  $("#quoteAuthor").text("-" + response.quoteAuthor + "-");
}

// FUNCTION GRABBING INGREDIENT INPUT SEARCH AND MAKING AJAX CALL
function ingredientSearch() {
  // SUBMIT LISTENER FOR INGREDIENT SEARCH INPUT
  $("#ingredientForm").submit(function() {
    event.preventDefault();
    searchDisplay.hide();
    brandDisplay.hide();
    drinkListDisplay.show();
    queryURLIngredient =
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
    // SELECTING INGREDIENT INPUT FROM FORM
    searchIngredient = $("#ingredient")
      .val()
      .trim();
    // CONCATENATE INGREDIENT AND URL
    queryURLIngredient += searchIngredient;
    // AJAX CALLS

    callAjax(queryURLIngredient);
    // ASSIGNING EMPTY VAL TO CLEAR INPUT
    searchIngredient = $("#ingredient").val("");
  });
}

// FUNCTION GRABBING DRINK INPUT SEARCH AND MAKING AJAX CALL
function drinkSearch() {
  // SUBMIT LISTENER FOR INGREDIENT SEARCH INPUT
  $("#drinkForm").submit(function() {
    event.preventDefault();
    searchDisplay.hide();
    brandDisplay.hide();
    drinkListDisplay.show();
    queryURLDrink = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    // SELECTING INGREDIENT INPUT FROM FORM
    searchDrink = $("#drink")
      .val()
      .trim();
    // CONCATENATE INGREDIENT AND URL
    queryURLDrink += searchDrink;
    // AJAX CALLS

    callAjax(queryURLDrink);
    // ASSIGNING EMPTY VAL TO CLEAR INPUT
    searchIngredient = $("#drink").val("");
  });
}

// AJAX CALL TO COCKTAIL API
function callAjax(url, arr) {
  $.ajax({
    url: url,
    method: "GET"
  }).then(function(response) {
    // CONDITION CHECKING IF QUOTE URL
    if (url === queryURLQuote) {
      // DISPLAY QUOTE
      displayQuote(response);
    } else {
      // console.log(response);
      $("body").css("background-image", "url(/assets/css/images/wood.jpg)");
      //   LOOP 10 TIMES AND PUSH FIRST 10 DRINKS INTO DRINKSARRAY
      for (var i = 0; i < response.drinks.length; i++) {
        // console.log(i)
        // IF GREATER THAN 10 BREAK FUNCTION
        if (i > 10) {
          break;
        }
        // PUSH DRINKS INTO DRINK ARRAY

        drinksArray.push(response.drinks[i]);
      }
      displayChosenDrink();
      stripIngredients();
      displayDrinks();
    }
  });
}

function init() {
  ingredientSearch();
  drinkSearch();
  searchDisplay.show();
  brandDisplay.show();
}

init();
