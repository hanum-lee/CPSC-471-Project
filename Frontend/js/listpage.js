// get stored variables
let userLogin = false;
let listPageTitle = "SEARCH RESULTS"; // SEARCH RESULTS, MY RECIPES, FAVOURITES
// set stored variables
function setVar() {

}

// global variables
let searchInput = '';
let searchOption = '';

//functions
function search() {
  searchInput = $("#navSearch").value;
}

function selectOption() {
  $("#navDropbtn").text($(this).text());
  searchOption = $(this).text();
  $("#navDropOption").hide();
}

function getRecipes() {
    var xhr;
    try {  xhr = new ActiveXObject('Msxml2.XMLHTTP');   }
    catch (e)
    {
        try {   xhr = new ActiveXObject('Microsoft.XMLHTTP');    }
        catch (e2)
        {
          try {  xhr = new XMLHttpRequest();     }
          catch (e3) {  xhr = false;   }
        }
     }
}

$(document).ready(function(){
  $.ajax("localhost:8080");




  // display login or logout
  if (userLogin) {
    $("#logButton").text('Logout');
  }
  else {
    $("#logButton").text('Login/Register');
    $("#manageButton").hide();
  }

  /***********************
  Navigation bar
  ***********************/
  $("#navSearchBttn").click(search);

  $("#navDropOption").hide();
  $("#navDropbtn").click(function(){
    $("#navDropOption").slideDown();
  });

  $(".navDropOption").click(selectOption);

  /***********************
  Add/Edit/View Recipe
  ***********************/
  $("#listPageTitle").text(listPageTitle);

});
