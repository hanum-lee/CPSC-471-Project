//document.write("Hello World");

// use variable to hide certain elements
let userLogin = false;

let loginButton = document.getElementById("logButton");
let manageButton = document.getElementById("manageButton");
if (userLogin) {
  loginButton.innerHTML = "Logout";
  manageButton.className = "";
}
else {
  loginButton.innerHTML = "Login/Register";
  manageButton.className = "hide";
}


/***********************
Searchbar
***********************/
let searchBar =  document.getElementById('mainSearch');
let searchButton = document.getElementById('searchButton');
let searchMssg = document.getElementById('searchMessage');
let searchInput = '';

searchButton.addEventListener("click",search);

function search() {
  let searchInput = searchBar.value;
  if (searchInput == '') {
    searchMssg.innerHTML = "aw nothing to search :(";
  }
  else {
    searchMssg.innerHTML = "Foooooood";
    console.log(searchInput);
  }
}

let drop = document.getElementById('dropOption');
let dropbtn = document.getElementByClassName('dropbtn');
drop.className = "hide";

dropbtn.addEventListener("click", dropdown);
function dropdown() {
  drop.className = "dropdown-content";
}

/***********************
Login/Register
***********************/

/***********************
Add/Edit/View Recipe
***********************/




// connect to server
/*
console.log("open: ");
var ws = new WebSocket("ws://127.0.0.1:8081");
ws.onopen = function (event) {
console.log('Connection is open ...');
ws.send("Hello Server");
};
ws.onerror = function (err) {
console.log('err: ', err);
}
ws.onmessage = function (event) {
console.log(event.data);
document.body.innerHTML += event.data + '&lt;br&gt;';
};
ws.onclose = function() {
console.log("Connection is closed...");
}
*/
