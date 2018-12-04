var recipeNum = sessionStorage.getItem("recipeSelected");
var recipeSelected = {
  recipeNum: recipeNum
}
var recipeData;
/* recipeData form

recipeData = {
  title: <title>,
  number: <num>
  author: <name>
  description: <des> (not now)
  foodType: [ft, ft, ....],
  ingredients: [i,i,....i],
  ingAmount: [ia, ia...],
  cookware: [c,c...c],
  steps: <s>,
  favourite: <true/false>
}
*/

var recipeReviewData;
/* recipeReviewData form

recipeReviewData = {
  author: [],
  text: [],
  point:[]
}
*/

var userReviewData;
/* reviewData form

uwerReviewData = {
  author: <username>,
  text: <review text>,
  point: <out of 5>
}
*/
var addOrEdit; // ADD if new review, EDIT if review exists

function addFavourite() {

}

function addOrEdit() {
  if (addOrEdit == "ADD") {
    addReview();
  }
  else if (addOrEdit == "EDIT") {
    editReview();
  }
  else {
    console.log("error in determining add or edit review");
  }
}

function addReview() {
  var recipeSelectString = JSON.stringify(recipeSelected);

  // get recipe data from server
  var req = new XMLHttpRequest();
  req.open('GET', '/recipeData', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeData = JSON.parse(req.responseText); //RETURNDATA
      }
  };
  req.send(recipeSelectString);
}

function editReview() {
  var recipeSelectString = JSON.stringify(recipeSelected);

  // get recipe data from server
  var req = new XMLHttpRequest();
  req.open('GET', '/recipeData', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeData = JSON.parse(req.responseText); //RETURNDATA
      }
  };
  req.send(recipeSelectString);
}

function deleteReview() {

}

function getRecipeData() {
  var recipeSelectString = JSON.stringify(recipeSelected);

  // get recipe data from server
  var req = new XMLHttpRequest();
  req.open('GET', '/recipeData', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeData = JSON.parse(req.responseText); //RETURNDATA
      }
  };
  req.send(recipeSelectString);
}

function showRecipe() {
  recipeData = {
    title: "My Recipe",
    author: "John", //username
    number: 1,
    foodType: ["noodle", "fushion", "dinner"],
    ingredients: ["bacon", "carrot", "onion"],
    ingAmount: ["4", "1 cup", "1"],
    ingType: ["meat", "vegi", "vegi"],
    cookware: ["pot", "spoon"],
    steps: "Cook the bacon in the pot and add carrots and onions stir with spoooon",
    favourite: "true"
  }

  $("#recipeTitle").text(recipeData.title);
  $("#recipeAuthor").text("Made by: " + recipeData.author);
  $("#steps").text(recipeData.steps);
  for (i=0;i<recipeData.ingredients.length;i++) {
    $("#ingredients").append(recipeData.ingredients[i] + " " + recipeData.ingAmount[i] + "<br>");
  }
  for (i=0;i<recipeData.cookware.length;i++) {
    $("#cookware").append(recipeData.cookware[i] + "<br>");
  }
}

function getReviews() {
  var recipeSelectString = JSON.stringify(recipeSelected);

  // get recipe data from server
  var req = new XMLHttpRequest();
  req.open('GET', '/getReviews', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeReviewData = JSON.parse(req.responseText); //RETURNDATA
      }
  };
  req.send(recipeSelectString);
}

function showReviews() {
// determine addOrEdit review
// if EDIT review, show user review in the user reivew input box, show delete review button
}

$(document).ready(function(){
  $("#deleteReview").hide();
  getRecipeData();
  showRecipe();
  getReviews();
  showReviews();


  if (sessionStorage.getItem("userLogin") == "true") {
    $("#favButton").show();
    $(".addReviewContainer").show();
    // allow add favourite when clicked
    // show add comment button
    // allow add comment
    $("#addReview").click(addOrEdit);

  }
  else {
    $("#favButton").hide();
    $(".addReviewContainer").hide();
  }
});
