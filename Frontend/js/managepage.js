

$(document).ready(function(){
  $("#addNew").click(function(){
    sessionStorage.setItem("recipePg", "ADD RECIPE");
  });
  $("#editExist").click(function(){
    sessionStorage.setItem("recipePg", "EDIT RECIPE");
    sessionStorage.setItem("listPg", "MY RECIPES")
  });
  $("#myFav").click(function(){
    sessionStorage.setItem("listPg", "MY FAVOURITES");
  });
  $("#editReview").click(function(){
    sessionStorage.setItem("listPg", "RECIPES REVIEWED");
  });
});
