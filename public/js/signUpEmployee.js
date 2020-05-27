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
    url: 'https://granjalasrosasback.web.app/getMyUser',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      if(data.role == "admin"){
        window.location = './signUp.html';
      }
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

function getMyEmployee() {


  $.ajax({
    url: 'https://granjalasrosasback.web.app/getMyEmployee',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      console.log(data);
      var welcome = document.getElementById("welcome");

      // var row = document.createElement("div");
      // row.setAttribute('class', 'row');

      var fullnameCol = document.createElement("div");
      fullnameCol.setAttribute('class', 'col-md-12');
      var fullnameText = document.createElement("label");
      fullnameText.setAttribute('class', 'user-label');
      fullnameText.innerText = data.name + " " + data.lastname1 + " " + data.lastname2;

      fullnameCol.appendChild(fullnameText);
      // row.appendChild(fullnameCol);

      welcome.appendChild(fullnameCol);

      var username = document.getElementById("username");

      var usernameCol = document.createElement("div");
      usernameCol.setAttribute('class', 'col-md-12');
      var usernameText = document.createElement("label");
      usernameText.setAttribute('class', 'user-label');
      usernameText.innerText = data.username;

      usernameCol.appendChild(usernameText);
      username.appendChild(usernameCol);

      var status = document.getElementById("status");

      var statusCol = document.createElement("div");
      statusCol.setAttribute('class', 'col-md-12');
      var statusText = document.createElement("label");
      statusText.setAttribute('class', 'user-label');
      if(data.active){
        statusText.innerText = "Activo";
        statusText.setAttribute('style', 'color:green');
      }else{
        statusText.innerText = "Inactivo"
        statusText.setAttribute('style', 'color:red');
      }

      statusCol.appendChild(statusText);
      status.appendChild(statusCol);

      var birthdate = document.getElementById("birthdate");

      var birthdateCol = document.createElement("div");
      birthdateCol.setAttribute('class', 'col-md-12');
      var birthdateText = document.createElement("label");
      birthdateText.setAttribute('class', 'user-label');
      birthdateText.innerText = data.birth_date;

      birthdateCol.appendChild(birthdateText);
      birthdate.appendChild(birthdateCol);

      var hiredate = document.getElementById("hiredate");

      var hiredateCol = document.createElement("div");
      hiredateCol.setAttribute('class', 'col-md-12');
      var hiredateText = document.createElement("label");
      hiredateText.setAttribute('class', 'user-label');
      hiredateText.innerText = data.hire_date;

      hiredateCol.appendChild(hiredateText);
      hiredate.appendChild(hiredateCol);


      $.each(data.salary, function(index, salarios) {
        console.log("salarios")
        // console.log(salarios.amount);
        var amount = document.getElementById("amount");
        var amountCol = document.createElement("div");
        amountCol.setAttribute('class', 'col-md-6');
        var amountText = document.createElement("label");
        amountText.setAttribute('class', 'user-label');
        amountText.innerText = "$ " + salarios.amount + ".00";
  
        amountCol.appendChild(amountText);
        amount.appendChild(amountCol);

        var date = document.getElementById("date");
        var dateCol = document.createElement("div");
        dateCol.setAttribute('class', 'col-md-6');
        var dateText = document.createElement("label");
        dateText.setAttribute('class', 'user-label');
        dateText.innerText = salarios.date;
  
        dateCol.appendChild(dateText);
        date.appendChild(dateCol);
        
      });
      var loading = document.getElementById("loading");
      var info = document.getElementById("info");
      var loading = document.getElementById("loading");
      if (loading.style.display === "block") {
        loading.style.display = "none";
        info.style.display = "block";
      }
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
      var loading = document.getElementById("loading");
      loading.setAttribute("display", "block");
    }
  });
}

// window.onload = function(){
//   <script language="JavaScript" src="http://jact.atdmt.com/jaction/JavaScriptTest"></script>
// };


getLogin()
checkingAdmin()
getMyEmployee()



