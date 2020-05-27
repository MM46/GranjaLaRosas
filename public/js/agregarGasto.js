

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


$('#agregarGasto').on('click', function () {

  let inputDate = $('#date').val();
  let description = $('#description').val();
  let cost = $('#cost').val();

  let year = inputDate.substring(0, 4);  
  let month = inputDate.substring(5, 7); 
  let day = inputDate.substring(8, 10);

  let date = year + month + day;

  json_to_send = {
    "date": parseInt(date),
    "description": description,
    "cost" : cost,
    "earning" : false,
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://granjalasrosasback.web.app/addConcept',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'POST',
    dataType: 'text',
    data: json_to_send,
    success: function (data) {
      alert("Gasto Registrado con Exito");
      console.log('success: ' + data);
      window.location = './gastos.html'
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });

});
