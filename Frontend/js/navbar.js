// get stored variables
let userLogin = false;
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

$(document).ready(function(){
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

});
