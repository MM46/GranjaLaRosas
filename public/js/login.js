$('#login_button').on('click', function () {
  // cargar email y password de su html
  let username = $('#username').val()
  let pass = $('#pass').val()

  json_to_send = {
    "username": username,
    "pass": pass
  };

  json_to_send = JSON.stringify(json_to_send)
  console.log(json_to_send)
  $.ajax({
    url: 'https://granjalasrosasback.web.app/login',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    dataType: 'text',
    data: json_to_send,
    success: function (data) {
      // guardar token en localstorage o cookie
      localStorage.setItem('token', data);
      window.location = './signUpEmployee.html';
    },
    error: function (error_msg) {
      alert(error_msg['responseText']);
      // alert("Hay un problema con el servidor vuelva a iniciar sesion mas tarde.");
    }
  });
});

function verifyLogin() {
  const token = localStorage.getItem('token');
  if (token) {
    window.location = './signUpEmployee.html';
  }
}
verifyLogin()