//document.write("Hello World");

/**********************
var for all pages
**********************/
let userLogin = false;

function Login() {
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
}

/***********************
Searchbar
***********************/
//variables
let searchBar =  document.getElementById('mainSearch');
let searchButton = document.getElementById('searchButton');
let searchMssg = document.getElementById('searchMessage');
let searchInput = '';

let drop = document.getElementById('dropOption');
let dropbtn = document.getElementById('dropbtn');
let dropOptions = document.getElementsByClassName('dropOption');
let searchOption = '';

//functions
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

function dropdown() {
  drop.className = "dropdown-content";
}

function selectOption() {
  dropbtn.textContent = this.textContent;
  searchOption = this.textContent;
  drop.className = "hide";

}

//implementation
searchButton.addEventListener("click",search);

drop.className = "hide";
dropbtn.addEventListener("click", dropdown);

for (var i = 0; i < dropOptions.length; i++) {
    (function () {
        dropOptions[i].addEventListener("click", selectOption);
    }());
}

/***********************
Login/Register
***********************/

/***********************
Add/Edit/View Recipe
***********************/

/***********************
Manage
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
