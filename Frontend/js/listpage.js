var userSearch = {
  searchInput: sessionStorage.getItem("userSearch") // input in the search bar
}
var userSearchString = JSON.stringify(userSearch);
var recipeList;
/* recipeList form
recipeList = {
  title: [<title>, <title>, ....],
  number: [<num>, <num>, ....]  //index corresponding to title
  username: [<name>, <name>, ...]
}
*/
console.log(sessionStorage.getItem("userSearch"));
function searchByIngredient() {

  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('POST', '/searchingredients', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
        showRecipes();
      }
  };
  console.log(userSearchString);
  req.send(userSearchString);
}

function searchByFoodType() {
  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('POST', '/searchfoodtype', true);
  req.setRequestHeader("Content-Type", "application/json");
   req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
        showRecipes();
    }
  };
  console.log(userSearchString);
  req.send(userSearchString);
}

function searchByFoodName() {
  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('POST', '/searchfoodname', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
        showRecipes();
      }
  };
  console.log(userSearchString);
  req.send(userSearchString);
}

function searchByRecipeName() {
  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('POST', '/searchrecipe', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
        showRecipes();
      }
  };
  console.log(userSearchString);
  req.send(userSearchString);
}

function searchByCookware() {
  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('POST', '/searchcookware', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
        showRecipes();
      }
  };
  console.log(userSearchString);
  req.send(userSearchString);
}

function getSearchResult() {
  switch(sessionStorage.getItem("userSearchType")) {
    case "Ingredients":
      searchByIngredient();
      break;
    case "Food type":
      searchByFoodType();
      break;
    case "Food name":
      searchByFoodName();
      break;
    case "Recipe name":
      searchByRecipeName();
      break;
    case "Cookware":
      searchByCookware();
      break;
    default:
      console.error("invalid user search type or null");
  }

}

// get list of recipes user added
function getMyRecipes() {
  var user = {
    username: sessionStorage.getItem("user")
  }
  var username = JSON.stringify(user);
  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('POST', '/searchmyrecipes', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
        showRecipes();
      }
  };
  req.send(username);
}

// get list of recipes user favourited
function getMyFavourites() {
  var user = {
    username: sessionStorage.getItem("user")
  }
  var username = JSON.stringify(user);
  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('POST', '/searchmyfavourites', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
        showRecipes();
      }
  };
  req.send(username);
}

// get list of recipes that have been reviewed by the user
function getRecipesReviewed() {
  var user = {
    username: sessionStorage.getItem("user")
  }
  var username = JSON.stringify(user);
  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('POST', '/searchrecipesreviewed', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
        showRecipes();
      }
  };
  req.send(username);
}

function getList(){
  userSearch.type = sessionStorage.getItem("listPg");
  if (sessionStorage.getItem("listPg") == "SEARCH RESULTS") {
    userSearch.input = sessionStorage.getItem("userSearch");
    userSearch.searchType = sessionStorage.getItem("userSearchType");
  }
  else {
    userSearch.input = sessionStorage.getItem("user");
  }

  var userSearchString = JSON.stringify(userSearch);
  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('POST', '/login', true);
  req.setRequestHeader("Content-Type", "application/json");
  // get info from server (if user exists/password correct)
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
      }
  };
  req.send(userSearchString);
}

function showRecipes() {
  // hard coded values for testing
/*
  recipeList = {
    title: ["R1", "R2", "R3", "R4", "R5"],
    number: [1, 2, 3, 4, 5],
    username: ["one", "two", "three", "four", "five"]
  }
*/

  if (recipeList.title.length == 0) {
    $(".contentContainer").text("No results");
  }
  for (i=0; i <( recipeList.title.length); i++) {
    $('.contentContainer').append("<button id='" + recipeList.number[i] + "' class='recipeButton'>" + recipeList.title[i] + "\tBy: " + recipeList.username[i] + "</button> <br>");
    $(".recipeButton").click(selectRecipe);
  }


}

function selectRecipe() {
  console.log("selectRecipe");
  var selectRecipeNum = $(this).attr("id");
  sessionStorage.setItem("recipeSelected", selectRecipeNum);
  if (sessionStorage.getItem("listPg") == "MY RECIPES") {
    window.location.href = "recipepage.html";
  }
  else {
    window.location.href = "viewrecipepage.html";
  }
}

$(document).ready(function(){
  $("#listPageTitle").text(sessionStorage.getItem("listPg"));

  switch(sessionStorage.getItem("listPg")) {
    case "SEARCH RESULTS":
      getSearchResult();
      break;
    case "MY RECIPES":
      getMyRecipes();
      break;
    case "MY FAVOURITES":
      getMyFavourites();
      break;
    case "RECIPES REVIEWED":
      getRecipesReviewed();
      break;
    default:
      console.error("invalid list page type or null");
	  console.error(sessionStorage.getItem("listPg"));
  }
});
