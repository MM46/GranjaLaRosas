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


$('#agregarSiembra').on('click', function () {

  let season = $('#season').val();
  let seed = $('#seed').val();
  let planting_date = $('#planting_date').val();
  let harvest_date = $('#harvest_date').val();
  let progress = $('#progress').val();

  json_to_send = {
    "season": season,
    "seed": seed,
    "planting_date" : planting_date,
    "harvest_date": harvest_date,
    "progress" : progress,
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://granjalasrosasback.web.app/addSiembra',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'POST',
    dataType: 'text',
    data: json_to_send,
    success: function (data) {
      alert("Siembra Registrada con Exito");
      // console.log('success: ' + data);
      window.location = './sembradios.html'
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });

});
