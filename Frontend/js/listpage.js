var userSearch = {
  searchInput: sessionStorage.getItem("userSearch") // input in the search bar
}
var userSearchString = JSON.stringify(userSearch);
var recipeList;
/* recipeList form
recipeList = {
  title: [<title>, <title>, ....],
  number: [<num>, <num>, ....]  //index corresponding to title
}
*/

function searchByIngredient() {

  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('GET', '/searchingredients', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
      }
  };
  req.send();
}

function searchByFoodType() {
  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('GET', '/searchfoodtype', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
      }
  };
  req.send(userSearchString);
}

function searchByFoodName() {
  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('GET', '/searchfoodname', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
      }
  };
  req.send(userSearchString);
}

function searchByRecipeName() {
  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('GET', '/searchrecipe', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
      }
  };
  req.send(userSearchString);
}

function searchByCookware() {
  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('GET', '/searchcookware', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
      }
  };
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
  req.open('GET', '/searchmyrecipes', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
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
  req.open('GET', '/searchmyfavourites', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
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
  req.open('GET', '/searchrecipesreviewed', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
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
  req.open('GET', '/login', true);
  req.setRequestHeader("Content-Type", "application/json");
  // get info from server (if user exists/password correct)
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
      }
  };
  req.send(userSearchString);
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

  // use recipeList to create new elements (div) in html
  // if user clicks div get num of recipe and link to viewrecipepage or recipepage

});
