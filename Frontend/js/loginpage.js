// get stored variables
let userLogin = false;
// set stored variables
function setVar() {

}

function userLog() {
  let username = $("#logUsername").val();
  let password = $("#logPassword").val();

  // sending information to server
  /*


  */

  // get info from server (if user exists/password correct)
  // set user login to true

}
function userReg() {
  let username = $("#regUsername").val();
  let password = $("#regPassword").val();

  // sending information to server
  /*


  */

  // get info from server (if user already exists)
  // set user login to true

}

$(document).ready(function(){
  if (sessionStorage.get("userLogin") == null) {

  }
  $("#logBtn").click(userLog);
  $("#regBtn").click(userReg);

});
