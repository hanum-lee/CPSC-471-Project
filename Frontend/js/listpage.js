let listPageTitle = "SEARCH RESULTS"; // SEARCH RESULTS, MY RECIPES, FAVOURITES

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
  /***********************
  Add/Edit/View Recipe
  ***********************/
  $("#listPageTitle").text(listPageTitle);

});
