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

function checkingAdminPromise() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'https://granjalasrosasback.web.app/getMyUser',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        if (data.role == "admin") {
          resolve();
        } else {
          reject();
        }
      },
      error: function (error_msg) {
        alert(error_msg['responseText']);
      }
    });
  })
}

function checkingAdmin() {
  checkingAdminPromise().catch(function () {
    alert("No tienes permiso de Administrador");
    window.location = './signUpEmployee.html';
  });
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

    },
    error: function (error_msg) {
      alert(error_msg['responseText']);
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

function resetPassword(username) {

  json_to_send = {
    "username": username
  };
  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://granjalasrosasback.web.app/resetPass',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'PATCH',
    dataType: 'json',
    data: json_to_send,
    success: function (data) {
      alert("La nueva contraseña de " + username + " es:" + data["pass"]);
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });

}

// terminateEmployee

function terminateEmployee(username) {

  json_to_send = {
    "username": username
  };
console.log("usss = " + username);
  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://granjalasrosasback.web.app/terminateEmployee',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'PATCH',
    dataType: 'json',
    data: json_to_send,
    success: function (data) {
      // alert("El usuario " + username + " se ha dado de baja exitosamente");
      // window.location = './empleadosRegistrados.html';
    },
    error: function (error_msg) {
      // alert((error_msg['responseText']));
      alert("El usuario " + username + " se ha dado de baja exitosamente");
      window.location = './empleadosRegistrados.html';
    }
  });

}
