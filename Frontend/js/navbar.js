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
  if (sessionStorage.getItem("userLogin") == null) {
    sessionStorage.setItem("userLogin", "false");
  }

  // display login or logout
  if (sessionStorage.getItem("userLogin") == "true") {
    $("#logButton").text('Logout');
    $("#manageButton").show();
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
