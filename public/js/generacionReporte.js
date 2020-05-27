// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//       x.className += " responsive";
//     } else {
//       x.className = "topnav";
//     }
//   }

var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

$('#logout_button').on('click', function () {
  $.ajax({
    url: 'https://granjalasrosasback.web.app/logout',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    success: function (data) {
      // agregar cÃ³digo aqui para poner los datos del todolist en el el html
      // addTodo(data._id, data.description, data.completed)
      console.log("logout hecho")

    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });

  localStorage.removeItem('token');
  window.location = './Login.html'
});

function getLogin() {
  const token = localStorage.getItem('token');
    if (!token) {
      window.location = './Login.html';
    }
}
  
getLogin()