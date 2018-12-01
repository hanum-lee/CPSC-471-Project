function search() {
  let searchInput = $("#navSearch").val();
  if (searchInput == '') {
    return;
  }
  else {
    sessionStorage.setItem("userSearch", searchInput);
    window.location.href = 'listpage.html';
  }
}

function selectOption() {
  $("#navDropbtn").text($(this).text());
  searchOption = $(this).text();
  $("#navDropOption").hide();

  sessionStorage.setItem("userSearchType", $(this).text());
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
