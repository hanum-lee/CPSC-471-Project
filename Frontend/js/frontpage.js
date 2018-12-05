//functions
function search() {
  let searchInput = $("#mainSearch").val();
  if (searchInput == '') {
    $("#searchMessage").text("aw nothing to search :(");
  }
  else if (sessionStorage.getItem("userSearchType") == null) {
    $("#searchMessage").text("Please select a search option!");
  }
  else {
    $("#searchMessage").text("eg. flour, water, sugar");
    sessionStorage.setItem("userSearch", searchInput);
    sessionStorage.setItem("listPg", "SEARCH RESULTS");
    window.location.href = 'listpage.html';
  }
}

function selectOption() {
  $("#dropbtn").text($(this).text());
  searchOption = $(this).text();
  $("#dropOption").hide();

  sessionStorage.setItem("userSearchType", $(this).text());
}

function loginout() {
  if (sessionStorage.getItem("userLogin") == "false") {
    window.location.href = "loginpage.html";
  }
  else if (sessionStorage.getItem("userLogin") == "true") {
    sessionStorage.setItem("userLogin", "false");
    window.location.href = "frontpage.html";
  }
  else {
    console.error("userLogin value null or invalid");
  }
}

$(document).ready(function(){
  if (sessionStorage.getItem("userLogin") == null) {
    sessionStorage.setItem("userLogin", "false");
  }

  // display login or logout
  if (sessionStorage.getItem("userLogin") == "true") {
    $("#logButton").text('Logout');
    $("#manageButton").show();
    $("#accountName").text(sessionStorage.getItem("user"));
    $("#accountName").show();
  }
  else {
    $("#logButton").text('Login/Register');
    $("#manageButton").hide();
    $("#accountName").hide();
  }

  $("#logButton").click(loginout);

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
