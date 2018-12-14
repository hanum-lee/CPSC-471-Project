function userLog() {
  var logSuccess;

  /* logSuccess form
  logSuccess = {
    userexists: <true or false value>
  }
  */

  // sending information to server
  var logInfo = {
    username: $("#logUsername").val(),
    password: $("#logPassword").val()
  }
  var logInfoString = JSON.stringify(logInfo);
  var req = new XMLHttpRequest();
  req.open('POST', '/login', true);
  req.setRequestHeader("Content-Type", "application/json");
  // get info from server (if user exists/password correct)
  req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        logSuccess = JSON.parse(req.responseText);  //RETURNDATA
		console.error(logSuccess.userexists);
      }
      // dealing with info from server
      if (logSuccess.userexists == "false") {
			alert("Invalid username or password");
          sessionStorage.setItem("loginMessage","invalid username or password");
      }
      else if (logSuccess.userexists == "true") {
        sessionStorage.setItem("userLogin", "true");
        sessionStorage.setItem("user", $("#logUsername").val());
        window.location.href = '/managepage.html';
      }
      else {
		alert("Login failed");
        sessionStorage.setItem("loginMessage","login failed");
      }
  };
  req.send(logInfoString);

  // dealing with info from server
  if (logSuccess.userexists == "false") {
	  alert("Invalid username or password");
      sessionStorage.setItem("loginMessage","invalid username or password");
  }
  else if (logSuccess.userexists == "true") {
    sessionStorage.setItem("userLogin", "true");
    sessionStorage.setItem("user", $("#logUsername").val());
    window.location.set('/managepage.html');
  }
  else {
	  alert("Login failed");
    sessionStorage.setItem("loginMessage","login failed");
  }
}

function userReg() {
  var logSuccess;
  /* logSuccess form
  logSuccess = {
    userexists: <true or false value>
  }
  */

  var logInfo = {
    username: $("#regUsername").val(),
    password: $("#regPassword").val()
  }
  var logInfoString = JSON.stringify(logInfo);

/*
  if (logInfo.username === '' || logInfo.password === ''){
    sessionStorage.setItem("loginMessage","username or password cannot be empty");
    return;
  }
  else if (logInfo.username.contains(' ') || logInfo.password.contains(' ')){
    sessionStorage.setItem("loginMessage","username and password cannot contain a space");
    return;
  }
*/
  // sending information to server
  var req = new XMLHttpRequest();
  req.open('POST', '/register', true);
  req.setRequestHeader("Content-Type", "application/json");
  // get info from server (if user exists/password correct)
  req.onreadystatechange = function () {
	  if (req.readyState === 4 && req.status === 200) {
		logSuccess = JSON.parse(req.responseText);  //RETURNDATA
		console.error(logSuccess.userexists);
	  }
      // dealing with info from server
      if (logSuccess.userexists == "true") {
		alert("Register Successful");
        sessionStorage.setItem("userLogin", "true");
        sessionStorage.setItem("user", $("#logUsername").val());
        window.location.href = 'managepage.html';

      }
      else if (logSuccess.userexists == "false") {
		alert("Username taken");
        sessionStorage.setItem("loginMessage","username taken");
      }
      else {
		  alert("Register failed");
        sessionStorage.setItem("loginMessage","Register failed");
      }
  };
  req.send(logInfoString);

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