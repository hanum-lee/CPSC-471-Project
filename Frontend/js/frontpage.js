//functions
function search() {
  let searchInput = $("#mainSearch").val();
  if (searchInput == '') {
    $("#searchMessage").text("aw nothing to search :(");
  }
  else {
    $("#searchMessage").text("eg. flour, water, sugar");
    sessionStorage.setItem("userSearch", searchInput);
    window.location.href = 'listpage.html';
  }
}

function selectOption() {
  $("#dropbtn").text($(this).text());
  searchOption = $(this).text();
  $("#dropOption").hide();

  sessionStorage.setItem("userSearchType", $(this).text());
}

$(document).ready(function(){
  if (sessionStorage.getItem("userLogin") == null) {
    sessionStorage.setItem("userLogin", "false");
  }
//sessionStorage.setItem("userLogin", "true");//test ignore
//sessionStorage.setItem("user", "I am user");// test ignore

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
