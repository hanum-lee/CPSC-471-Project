let recipePageTitle = "ADD RECIPE"; // ADD RECIPE, EDIT RECIPE

function selectOption() {
  $("#navDropbtn").text($(this).text());
  searchOption = $(this).text();
  $("#navDropOption").hide();
}

$(document).ready(function(){
  /***********************
  Add/Edit Recipe
  ***********************/
  $("#recipePageTitle").text(recipePageTitle);

});
