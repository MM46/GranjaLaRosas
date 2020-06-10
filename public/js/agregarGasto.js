

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
  let earningBool = $('#earning').val();
  let earning = false;

  if (earningBool == "true"){
    earning = true;
  }
  // console.log("earrr = "+ earning);


  json_to_send = {
    "date": formatDate(inputDate),
    "description": description,
    "cost" : parseInt(cost),
    "earning" : earning,
  };

  json_to_send = JSON.stringify(json_to_send);
  // console.log("date = " + formatDate(inputDate));
  // console.log("desc = " + description);
  // console.log("cost = " + parseInt(cost));
  // console.log(earning);

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
