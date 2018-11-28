// get stored variables
let userLogin = false;
let recipePageTitle = "ADD RECIPE"; // ADD RECIPE, EDIT RECIPE
// set stored variables
function setVar() {

}

function userLog() {
  let username = $("#logUsername").val();
  let password = $("#logPassword").val();
}
function userReg() {
  let username = $("#regUsername").val();
  let password = $("#regPassword").val();  
}

// global variables
let searchInput = '';
let searchOption = '';

$(document).ready(function(){
  /***********************
  Login/Register
  ***********************/

  $("#logBtn").userLog();
  $("#regBtn").userReg();


});
