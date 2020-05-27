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
  

function getMyUser() {
  $.ajax({
    url: 'https://granjalasrosasback.web.app/getMyUser',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token

    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      alert("get my user = " + data.pass);
      // admin = true;
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

getLogin()
// getMyUser()


$('#changePassword_button').on('click', function () {
  let old_pass = $('#old_pass').val();
  let new_pass = $('#new_pass').val();

  json_to_send = {
    "old_pass": old_pass,
    "new_pass": new_pass
  };

  json_to_send = JSON.stringify(json_to_send);

  console.log("old pass: ", old_pass);
  console.log("new pass: ", new_pass);

  $.ajax({
    url: 'https://granjalasrosasback.web.app/updatePass',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'PATCH',
    dataType: 'text',
    data: json_to_send,
    success: function (data) {
      console.log("updating pass");
      alert("Contraseña de cambiada con exito.");
      // admin = true;
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });
});