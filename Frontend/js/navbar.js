function search() {
  let searchInput = $("#navSearch").val();
  if (searchInput == '') {
    return;
  }
  else {
    sessionStorage.setItem("userSearch", searchInput);
    sessionStorage.setItem("listPg", "SEARCH RESULTS");
    window.location.href = 'listpage.html';
  }
}

function selectOption() {
  $("#navDropbtn").text($(this).text());
  searchOption = $(this).text();
  $("#navDropOption").hide();

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
  Navigation bar
  ***********************/
  $("#navSearchBttn").click(search);

  $("#navDropOption").hide();
  $("#navDropbtn").click(function(){
    $("#navDropOption").slideDown();
  });

  $(".navDropOption").click(selectOption);

});
