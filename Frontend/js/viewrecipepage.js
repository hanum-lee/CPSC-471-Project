var recipeNum = sessionStorage.getItem("recipeSelected");
var recipeSelected = {
  username: sessionStorage.getItem("user"),
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
  timeTake: <t>,
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
/* userReviewData form

userReviewData = {
  recipe: <recipe name>,
  author: <username>,
  text: <review text>,
  point: <out of 5>
}
*/

function favButtonClicked() {
  if (recipeData.favourite == "false") {
    recipeData.favourite = "true";
    alert("Favorited");
    addFavourite();
  }
  else if (recipeData.favourite == "true") {
    recipeData.favourite = "false";
    alert("Removed Favorite");
    deleteFavourite();
  }
}
function addFavourite() {
  var recipeSelectString = JSON.stringify(recipeSelected);

  // get recipe data from server
  var req = new XMLHttpRequest();
  req.open('post', '/addfavorites', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        console.log("favourite add send successful");
      }
  };
  req.send(recipeSelectString);
}

function deleteFavourite() {
  var recipeSelectString = JSON.stringify(recipeSelected);

  // get recipe data from server
  var req = new XMLHttpRequest();
  req.open('delete', '/removefavorites', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        console.log("favourite delete send successful")
      }
  };
  req.send(recipeSelectString);
}

function getReviews() {
  var recipeSelectString = JSON.stringify(recipeSelected);

  // get recipe data from server
  var req = new XMLHttpRequest();
  req.open('POST', '/getReviews', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeReviewData = JSON.parse(req.responseText); //RETURNDATA
      }
      showReviews();
  };
  req.send(recipeSelectString);
}

function showReviews() {
   // hard coded values for testing
   /*
  recipeReviewData = {
    author: ["user1", "user2", "user3", "user4"],
    text: ["this is the best recipe EVER", "eh ok", "yo so easy to make", "yummy"],
    point:[5,3,4,4]
  }
  */


  for (i=0;i<recipeReviewData.author.length;i++) {
    if (recipeReviewData.author[i] == sessionStorage.getItem("user")){
      $("#userReview").val(recipeReviewData.text[i]);
      $("#deleteReview").show();
      $("#deleteReview").click(deleteReview);
    }
    else {
      console.log("add review");
      $("#reviews").append("<tr id='r"+i+"'></tr>");
      $("#r"+i).append("<p class='reviewAuthor'>" + recipeReviewData.author[i] + "</p>");
      $("#r"+i).append("<p class='reviewText'>" + recipeReviewData.text[i] + "</p>");
    }
  }

// determine addOrEdit review
// if EDIT review, show user review in the user reivew input box, show delete review button
}

function addEditReview() {
  console.log("review added");
  // if not empty review box
  if ($.trim($("#userReview").val())) {
    console.log("review not empty");
    var userReviewString = JSON.stringify(userReviewData);

    // get recipe data from server
    var req = new XMLHttpRequest();
    req.open('POST', '/addeditreview', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
          console.log("add/edit review data send successful");
      alert("Added Review");
      $("#deleteReview").show();
      $("#deleteReview").click(deleteReview);
        }
    };
    req.send(userReviewString);

  }
  else {
    console.log("empty user review text area");
  }
}

function deleteReview() {
  var userReviewString = JSON.stringify(userReviewData);

  // get recipe data from server
  var req = new XMLHttpRequest();
  req.open('GET', '/deletereview', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        console.log("delete review send successful");
      }
  };
  req.send(userReviewString);
}

function getRecipeData() {
  var recipeSelectString = JSON.stringify(recipeSelected);

  // get recipe data from server
  var req = new XMLHttpRequest();
  req.open('POST', '/recipeData', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeData = JSON.parse(req.responseText); //RETURNDATA
      }
      showRecipe();
  };
  console.log(recipeSelectString);
  req.send(recipeSelectString);
}

function showRecipe() {

  $("#recipeTitle").text(recipeData.title);
  $("#recipeAuthor").text("Made by: " + recipeData.author);
  $("#steps").text(recipeData.steps);
  $("#timeTake").text("Time it takes to prepare food: " + recipeData.timeTake);
  for (i=0;i<recipeData.ingredients.length;i++) {
    $("#ingList").append("<li>" + recipeData.ingredients[i] + " " + recipeData.ingAmount[i] + "</li>");
  }
  for (i=0;i<recipeData.cookware.length;i++) {
    $("#cwList").append("<li>" + recipeData.cookware[i] + "</li>");
  }
}

$(document).ready(function(){
  $("#deleteReview").hide();
  getRecipeData();
  getReviews();

  if (sessionStorage.getItem("userLogin") == "true") {
    $("#favButton").show();
    $("#favButton").click(favButtonClicked);
    $(".addReviewContainer").show();
    // allow add favourite when clicked
    // show add comment button
    // allow add comment

    $("#addReview").click(addEditReview);

  }
  else {
    $("#favButton").hide();
    $(".addReviewContainer").hide();
  }
});
