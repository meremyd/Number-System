function validateLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;


  if (username === "mere.myd" && password === "PQS0987") {

    window.location.href = "numbersystem.html";
    alert("Welcome, Mary Myd Suliano!")
  }
  else if (username === "danna.fe" && password === "PQS0987") {

    window.location.href = "numbersystem.html";
    alert("Welcome, Dannafe Pesidas!")
  }
  else if (username === "yan.qu" && password === "PQS0987") {

    window.location.href = "numbersystem.html";
    alert("Welcome, Adrian Quiroy")
  }
  else {
    alert("Invalid username or password. Please try again.");
  }
}

