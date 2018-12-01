var recipeNum = sessionStorage.getItem("recipeSelected");
var recipeSelected = {
  recipeNum: recipeNum
}
var recipeData;
/* recipeData form

recipeData = {
  title: <title>,
  number: <num>
  description: <d>,
  foodType: [ft, ft, ....],
  ingredients: [i,i,....i],
  cookware: [c,c...c],
  steps: <s>,
  favourite: <true/false>
}
*/

function addFavourite() {

}

function addReview() {

}

function getData() {
  var recipeSelectString = JSON.stringify(recipeSelected);

  // get recipe data from server
  var req = new XMLHttpRequest();
  req.open('GET', '/recipeData', false);
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
  getData();

  if (sessionStorage.getItem("userLogin") == "true") {
    // show favourite button
    // allow add favourite when clicked
    // show add comment button
    // allow add comment
  }
});
