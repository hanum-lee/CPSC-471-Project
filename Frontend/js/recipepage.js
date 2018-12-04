var counterF = 1;
var counterI = 1;
var counterC = 1;
var recipeNum = sessionStorage.getItem("recipeSelected");
var recipeSelected = {
  username: sessionStorage.getItem("user"),
  recipeNum: recipeNum
}
// variable for data returned by server
var recipeData;
/* recipeData form
recipeData = {
  title: <title>,
  author: <name>,
  number: <num>,
  description: <d>,
  foodType: [ft, ft, ....],
  ingredients: [i,i,....i],
  cookware: [c,c...c],
  steps: <s>,
  favourite: <true/false>
}
*/

function getRecipe() {
  var recipeSelectString = JSON.stringify(recipeSelected);
  // get recipe data from server
  var req = new XMLHttpRequest();
  req.open('POST', '/editRecipe', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeData = JSON.parse(req.responseText); //RETURNDATA
      }
  };
  req.send(recipeSelectString);
}

function sendData() {
  var recipeDataString = JSON.stringify("recipeData");
  // get recipe data from server
  var req = new XMLHttpRequest();
  if (sessionStorage.getItem("recipePg") == "EDIT RECIPE") {
      req.open('POST', '/recipeUpdate', true);
  }
  else {
      req.open('POST', '/recipeAdd', true);
  }
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        console.log("sent");
      }
  };
  req.send(recipeDataString);
}

function sendDelete() {
  var recipeSelectString = JSON.stringify(recipeSelected);
  // get recipe data from server
  var req = new XMLHttpRequest();
  req.open('DELETE', '/deleteRecipe', true);
  req.setRequestHeader("Content-Type", "application/json");
  // get info from server (if user exists/password correct)
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        console.log("sent");
      }
  };
  req.send(recipeSelectString);

}

function addFoodtype() {
  counterF++;
  if(counterF>20){
    alert("Only 20 Food Types allowed");
    counterF--;
    return false;
  }

  $('#foodTypes').append("Food Type " + counterF + ": ", $("<input id='fType" + counterF + "' class='recipeInfo'> <br>"));
}

function addIngredient() {
  counterI++;
  if(counterI>20){
    alert("Only 20 Ingredients allowed");
    return false;-
  }

  $('#ingredients').append("Ingredient " + counterI + ": ", $("<input id='ing" + counterI + "' class='recipeInfo'>"));
  $('#ingredients').append("Ingredient Amount  " + counterI + ": ", $("<input id='ingAmount" + counterI + "' class='recipeInfo'>"));
  $('#ingredients').append("Ingredient Type  " + counterI + ": ", $("<input id='ingType" + counterI + "' class='recipeInfo'> <br>"));
}

function addCookware() {
  counterC++;
  if(counterC>20){
    alert("Only 10 Cookwares allowed");
    return false;
  }

function removeFoodtype() {
  if (counterF == 1){
    alert("At least 1 food type required");
    return;
  }
  $("#fType" + counterF).remove();
  counterF--;
}

function removeIngredient() {
  if (counterI == 1){
    alert("At least 1 ingredient required");
    return;
  }
  $("#ing" + counterI).remove();
  $("#ingType" + counterI).remove();
  $("#ingAmount" + counterI).remove();
  counterI--;
}

function removeCookware() {
  if (counterC == 1){
    alert("At least 1 cookware required");
    return;
  }
  $("#cookw" + counterC).remove();
  counterC--;
}

  $('#cookwares').append("Cookware " + counterC + ": ", $("<input id='cookw" + counterC + "' class='recipeInfo'> <br>"));
}

$(document).ready(function(){

  sessionStorage.setItem("recipePg", "EDIT RECIPE"); //test case (ignore)
  $("#recipePageTitle").text(sessionStorage.getItem("recipePg"));


  // case when editing existing recipe
  if (sessionStorage.getItem("recipePg") == "EDIT RECIPE") {
    $('.deleteButton').show();
    getRecipe();
    // modify input text seen on site
    // modify recipe data
  }
  // case when adding new recipe
  else {
    $('.deleteButton').hide();
    // get recipe data from user input
  }

  // add input box
  $('#addFoodtype').click(addFoodtype);
  $('#addIngredient').click(addIngredient);
  $('#addCookware').click(addCookware);
  // remove input box
  $("#removeFoodtype").click(removeFoodtype);
  $("#removeIngredient").click(removeIngredient);
  $("#removeCookware").click(removeCookware);


  // send info to server if click save
  $("#saveButton").click(sendData);
  // send command to delete if click delete
  $("#deleteButton").click(sendDelete);
});
