//var req = new XMLHttpRequest();

function userLog() {
  let username = $("#logUsername").val();
  let password = $("#logPassword").val();

  var logInfo = {
    user: username,
    pass: password
  }
  /*
  var loggedInt = {
    success: true;
  }
  */
  
  var logInfoString = JSON.stringify(logInfo);

  $.ajax({
    url:  'localhost:8080',
    type: 'GET',
    data: logInfoString,
    dataType: 'json',
    success: (data) => {
      console.log("success");
    }

  })

  // sending information to server using xml
  /*
  var logInfo = {
    username: $("#logUsername").val();
    password: $("#logPassword").val();
  }
  var logInfoString = JSON.stringify(logInfo);


  req.open('GET', 'Server.js', true);
  req.send();
  */

  // get info from server (if user exists/password correct)
  // set user login to true
  // set userid
  // got to home page if logged in
    //window.location.href = 'frontpage.html'

}
function userReg() {
  let username = $("#regUsername").val();
  let password = $("#regPassword").val();

  if (username == '' || password == ''){
    sessionStorage.setItem("loginMessage","username or password cannot be empty");
  }
  else if (username.contains(' ') || password.contains(' ')){
    sessionStorage.setItem("loginMessage","username and password cannot contain a space");

  }

  // sending information to server
  /*


  */

  // get info from server (if user already exists)
  // set user login to true
  // set userid
  // got to home page if registered
    //window.location.href = 'frontpage.html'
}

$(document).ready(function(){
  if (sessionStorage.getItem("userLogin") == null) {
    sessionStorage.setItem("userLogin", "false");
  }
  if (sessionStorage.getItem("loginMessage") != null) {
    let mssg = $("#logMessage");
    mssg.text(sessionStorage.getItem("loginMessage"));
  }
  $("#logBtn").click(userLog);
  $("#regBtn").click(userReg);

});
