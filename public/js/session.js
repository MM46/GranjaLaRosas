var token = localStorage.getItem('token');
token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.

function getLogin() {
  if (!token) {
    window.location = './Login.html';
  }
}

function getToken() {
  return token;
}

function checkingAdmin() {
  $.ajax({
    url: 'https://granjalasrosasback.web.app/getMyUser',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      // alert("role: " + data.role);
      if (data.role == "employee") {
        alert("No tienes permiso de Administrador");
        window.location = './signUpEmployee.html';
      }
    },
    error: function (error_msg) {
      alert(error_msg);
    }
  });
}

getLogin()
checkingAdmin()

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

