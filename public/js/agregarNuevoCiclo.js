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


$('#agregarNuevoCiclo').on('click', function () {

  let period_start = $('#period_start').val();
  let period_end = $('#period_end').val();
  let pay_date = $('#pay_date').val();

  json_to_send = {
    "period_start": period_start,
    "period_end": period_end,
    "pay_date" : pay_date
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://granjalasrosasback.web.app/newPayCycle',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'POST',
    dataType: 'text',
    data: json_to_send,
    success: function (data) {
      alert("Nuevo Ciclo Registrado con Exito");
      console.log('success: ' + data);
      window.location = './nominas.html'
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });

});
