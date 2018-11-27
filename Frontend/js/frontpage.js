// get stored variables
let userLogin = false;
let recipePageTitle = "RECIPE"; // RECIPE, ADD RECIPE, EDIT RECIPE
// set stored variables
function setVar() {
}

// global variables
let searchInput = '';
let searchOption = '';

//functions
function search() {
  let searchInput = $("#mainSearch").val();
  if (searchInput == '') {
    $("#searchMessage").text("aw nothing to search :(");
  }
  else {
    $("#searchMessage").text("Foooooood");
  }
}

function selectOption() {
  $("#dropbtn").text($(this).text());
  searchOption = $(this).text();
  $("#dropOption").hide();
}

$(document).ready(function(){
  // display login or logout
  if (userLogin) {
    $("#logButton").text('Logout');
    $("#manageButton").show();
  }
  else {
    $("#logButton").text('Login/Register');
    $("#manageButton").hide();
  }

  /***********************
  Searchbar
  ***********************/
  $("#searchButton").click(search);

  $("#dropOption").hide();
  $("#dropbtn").click(function(){
    $("#dropOption").slideDown();
  });

  $(".dropOption").click(selectOption);
});
