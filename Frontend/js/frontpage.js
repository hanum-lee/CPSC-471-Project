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
  Searchbar
  ***********************/
  $("#searchButton").click(search);

  $("#dropOption").hide();
  $("#dropbtn").click(function(){
    $("#dropOption").slideDown();
  });

  $(".dropOption").click(selectOption);
});
