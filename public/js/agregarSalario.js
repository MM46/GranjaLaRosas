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


getLogin()
// checkingAdmin()

function getParameters(){
  var parameters = location.search.substring(1).split("&");

  var temp = parameters[0].split("=");
  username = unescape(temp[1]);

  
  // temp = parameters[1].split("=");
  // date = unescape(temp[1]);

  // temp = parameters[2].split("=");
  // salary = unescape(temp[1]);

  document.getElementById("username").textContent = username;
  // document.getElementById("date").value = date;
  // document.getElementById("salary").value = salary;

}
getParameters();

$('#agregarSalario').on('click', function () {

  let username = $('#username').text();
  let date = $('#date').val();
  date = formatDate(date);
  let salary = $('#salary').val();

  json_to_send = {
    'username': username,
    'date': date,
    'salary': salary
  };

  json_to_send = JSON.stringify(json_to_send);
  console.log(json_to_send);
  $.ajax({
    url: 'https://granjalasrosasback.web.app/updateSalary',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'PATCH',
    dataType: 'text',
    data: json_to_send,
    success: function (data) {
      // alert(data);
      alert("El salario se ha agregado con exito.");
      window.location = './empleadosRegistrados.html'
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });

});
