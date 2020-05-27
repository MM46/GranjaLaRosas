var token = localStorage.getItem('token');
var admin = false;
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

// function getToken() {
//   console.log("hola token granja")
//   console.log(token)
// }

// getToken()


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

function checkingAdmin() {
  $.ajax({
    url: 'https://granjalasrosasback.web.app/dummyAdmin',
    headers: {
      'Content-Type': 'application/json',

    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      console.log("Eres admin");
      // admin = true;
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

getLogin()
checkingAdmin()

$('#registrar_button').on('click', function () {

  let username = $('#username').val();
  let name = $('#name').val();
  let lastname1 = $('#lastname1').val();
  let lastname2 = $('#lastname2').val();
  let birth_date = $('#birth_date').val();
  let hire_date = $('#hire_date').val();
  let salary = $('#salary').val();

  json_to_send = {
    "username": username,
    "name": name,
    "lastname1" : lastname1,
    "lastname2" : lastname2,
    "birth_date" : birth_date,
    "hire_date" : hire_date,
    "salary" : salary
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://granjalasrosasback.web.app/registerEmployee',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function (data) {
      // json = JSON.stringify(data);
      alert("Usuario Registrado con Exito. Tu contraseña es:" + data["pass"]);
      // console.log('success: ' + data);
      // window.location = './empleadosRegistrados.html'
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });

});
