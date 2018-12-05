var counterF = 1;
var counterI = 1;
var counterC = 1;
var recipeNum = sessionStorage.getItem("recipeSelected");
var recipeSelected = {
  username: sessionStorage.getItem("user"),
  recipeNum: recipeNum
}
// variable for data returned by server
var recipeData= {
  title: "",
  author: "",
  number: 0,
  foodType: [],
  ingredients: [],
  ingAmount: [],
  ingType: [],
  cookware: [],
  timeTake: "",
  steps: "",
  favourite: "false"
}


function getRecipe() {
  var recipeSelectString = JSON.stringify(recipeSelected);
  // get recipe data from server
  var req = new XMLHttpRequest();
  req.open('POST', '/editRecipe', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeData = JSON.parse(req.responseText); //RETURNDATA
        placeRecipeInForm();
      }
  };
  console.log(recipeSelectString);
  req.send(recipeSelectString);
}

function placeRecipeInForm() {

  $("#inputRecipeTitle").val(recipeData.title);
  $("#stepsInput").val(recipeData.steps);
  $("#timeTakeInput").val(recipeData.timeTake);
  for (i=0;i<recipeData.foodType.length;i++) {
    if (i>0) {
      addFoodtype();
    }
    $("#fType"+(i+1)).val(recipeData.foodType[i]);
  }
  for (i=0;i<recipeData.ingredients.length;i++) {
    if (i>0) {
      addIngredient();
    }
    $("#ing"+(i+1)).val(recipeData.ingredients[i]);
    $("#ingAmount"+(i+1)).val(recipeData.ingAmount[i]);
    $("#ingType"+(i+1)).val(recipeData.ingType[i]);
  }
  for (i=0;i<recipeData.cookware.length;i++) {
    if (i>0) {
      addCookware();
    }
    $("#cookw"+(i+1)).val(recipeData.cookware[i]);
  }
}

function sendData() {
  console.log("sent data");
  getRecipeInput();
  var recipeDataString = JSON.stringify(recipeData);
  // get recipe data from server
  var req = new XMLHttpRequest();
  if (sessionStorage.getItem("recipePg") == "EDIT RECIPE") {
      req.open('POST', '/recipeUpdate', true);
  }
  else {
	  console.log(recipeDataString);
      req.open('POST', '/recipeAdd', true);
  }
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        console.log("recipe data send successful");
        sessionStorage.setItem("listPg", "MY RECIPES");
        window.location.href = "listpage.html";
      }
  };
  req.send(recipeDataString);
}

function getRecipeInput() {
  var ftArray = [];
  var ingArray = [];
  var ingAmountArray = [];
  var ingTypeArray = [];
  var cookArray = [];

  recipeData.title = $("#inputRecipeTitle").val();
  recipeData.author = sessionStorage.getItem("user");
  recipeData.steps = $("#stepsInput").val();
  recipeData.timeTake = $("#timeTakeInput").val();
  if (sessionStorage.getItem("recipePg") == "EDIT RECIPE") {
    recipeData.number = recipeSelected.recipeNum;
  }
  else {
    recipeData.number = null;
  }

  for (i=0; i<counterF; i++) {
    ftArray.push($("#fType"+(i+1)).val());
  }
  for (i=0; i<counterI; i++) {
    ingArray.push($("#ing"+(i+1)).val());
    ingAmountArray.push($("#ingAmount"+(i+1)).val());
    ingTypeArray.push($("#ingType"+(i+1)).val());
  }
  for (i=0; i<counterC; i++) {
    cookArray.push($("#cookw"+(i+1)).val());
  }

  recipeData.foodType = ftArray;
  recipeData.ingredients = ingArray;
  recipeData.ingAmount = ingAmountArray;
  recipeData.ingType = ingTypeArray;
  recipeData.cookware = cookArray;
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
        console.log("delete recipe send successful");
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

  $('#foodTypes').append("<span id='fTypeBox" + counterF + "'> </span>");
  $('#fTypeBox'+counterF).append("Food Type " + counterF + ": ", $("<input id='fType" + counterF + "' class='recipeInfo'> <br>"));
}

function addIngredient() {
  counterI++;
  if(counterI>20){
    alert("Only 20 Ingredients allowed");
    return false;
  }

  $('#ingredients').append("<span id='ingBox" + counterI + "'> </span>");
  $('#ingBox'+counterI).append("Ingredient " + counterI + ": ", $("<input id='ing" + counterI + "' class='recipeInfo'>"));
  $('#ingBox'+counterI).append("Ingredient Amount  " + counterI + ": ", $("<input id='ingAmount" + counterI + "' class='recipeInfo'>"));
  $('#ingBox'+counterI).append("Ingredient Type  " + counterI + ": ", $("<input id='ingType" + counterI + "' class='recipeInfo'> <br>"));
}

function addCookware() {
  console.log("add cookware");
  counterC++;
  if(counterC>20){
    alert("Only 10 Cookwares allowed");
    return false;
  }
  $('#cookwares').append("<span id='cookwBox" + counterC + "'> </span>");
  $('#cookwBox'+counterC).append("Cookware " + counterC + ": ", $("<input id='cookw" + counterC + "' class='recipeInfo'> <br>"));
}


function removeFoodtype() {
  if (counterF == 1){
    alert("At least 1 food type required");
    return;
  }
  $("#fTypeBox" + counterF).remove();
  counterF--;
}

function removeIngredient() {
  if (counterI == 1){
    alert("At least 1 ingredient required");
    return;
  }
  $("#ingBox" + counterI).remove();
  counterI--;
}

function removeCookware() {
  if (counterC == 1){
    alert("At least 1 cookware required");
    return;
  }
  $("#cookwBox" + counterC).remove();
  counterC--;
}

$(document).ready(function(){
  $("#recipePageTitle").text(sessionStorage.getItem("recipePg"));

  // case when editing existing recipe
  if (sessionStorage.getItem("recipePg") == "EDIT RECIPE") {
    $('#deleteButton').show();
    getRecipe();
  }
  // case when adding new recipe
  else {
    $('#deleteButton').hide();
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
