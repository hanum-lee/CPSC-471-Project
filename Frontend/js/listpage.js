var userSearch = {
  type: "", // list page title
  input: "", // search bar input or username
  searchType: "" // ingredient, food type, food name, etc. (ignore for type not SEARCH RESULTS)
}
var recipeList;
/* recipeList form
recipeList = {
  title: [<title>, <title>, ....],
  number: [<num>, <num>, ....]  //index corresponding to title
  favourite: [<true., <false>, ...] //if favourited (true/false) corresponding to title
}
*/

function getList(){
  userSearch.type = sessionStorage.getItem("listPg");
  if (sessionStorage.getItem("listPg") == "SEARCH RESULTS") {
    userSearch.input = sessionStorage.getItem("userSearch");
    userSearch.searchType = sessionStorage.getItem("userSearchType");
  }
  else {
    userSearch.input = sessionStorage.getItem("user");
  }

  var userSearchString = JSON.stringify(userSearch);
  // get list of recipes from server
  var req = new XMLHttpRequest();
  req.open('GET', '/login', false);
  req.setRequestHeader("Content-Type", "application/json");
  // get info from server (if user exists/password correct)
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        recipeList = JSON.parse(req.responseText); //RETURNDATA
      }
  };
  req.send(userSearchString);
}

$(document).ready(function(){
  $("#listPageTitle").text(sessionStorage.getItem("listPg"));

  // use recipeList to create new elements (div) in html

  // if user clicks div get num of recipe and link to viewrecipepage or recipepage

});
