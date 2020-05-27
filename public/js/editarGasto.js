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
  
// function checkingAdmin() {
//   $.ajax({
//     url: 'https://granjalasrosasback.web.app/dummyAdmin',
//     headers: {
//       'Content-Type': 'application/json',

//     },
//     method: 'GET',
//     dataType: 'json',
//     success: function (data) {
//       console.log("Eres admin");
//       // admin = true;
//     },
//     error: function (error_msg) {
//       alert((error_msg['responseText']));
//     }
//   });
// }

getLogin()
// checkingAdmin()

function getParameters(){
  var parameters = location.search.substring(1).split("&");

  var temp = parameters[0].split("=");
  date = unescape(temp[1]);

  temp = parameters[1].split("=");
  description = unescape(temp[1]);

  temp = parameters[2].split("=");
  cost = unescape(temp[1]);

  document.getElementById("date").value = date;
  document.getElementById("description").value = description;
  document.getElementById("cost").value = cost;

  document.getElementById("date").setAttribute("prevValue", date);
  document.getElementById("description").setAttribute("prevValue", description);
  document.getElementById("cost").setAttribute("prevValue", cost);
}
getParameters();


$('#guardarCambiosGasto').on('click', function () {

  let date = $('#date').val();
  let description = $('#description').val();
  let cost = $('#cost').val();

  let oldDate = $('#date').attr("prevValue");
  let oldDescription = $('#description').attr("prevValue");
  let oldCost = $('#cost').attr("prevValue");


  console.log("old values");
  console.log("date = ", oldDate);
  console.log("description = ", oldDescription);
  console.log("Cost = ", oldCost);

  console.log("new values");
  console.log("date = ", date);
  console.log("description = ", description);
  console.log("Cost = ", cost);

  json_to_send = {
    "old": {
      'date': oldDate,
      'description': oldDescription,
      'cost': oldCost
    },
    "new": {
      "date": date,
      "description": description,
      "cost" : cost
    }
  };

  json_to_send = JSON.stringify(json_to_send);
  
  $.ajax({
    url: 'https://granjalasrosasback.web.app/updateExpense',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'PATCH',
    dataType: 'text',
    data: json_to_send,
    success: function (data) {
      alert(data);
      // alert("Cambios guardados con Exito");
      // window.location = './gastos.html'
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });

});
