

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


function loadInitialInfo(){

  var lista = document.getElementById("nominas");

  var title = document.createElement("h2");
  title.innerText = "Nóminas"

  var ul = document.createElement("ul");
  ul.setAttribute("class","list-group list-group-flush");

  var container = document.createElement("div");
  container.setAttribute("class","container");

  var divRow = document.createElement("div");
  divRow.setAttribute("id", "info-usuarios");

  var firstRow = document.createElement("div");
  firstRow.setAttribute("class", "row");

  divRow.innerHTML += "<hr>"
  firstRow.innerHTML += "<div class="+"col"+"><label class="+"title-label"+">Fecha de Inicio</label></div>";
  firstRow.innerHTML += "<div class="+"col"+"><label class="+"title-label"+">Fecha de Finalización</label></div>";
  firstRow.innerHTML += "<div class="+"col"+"><label class="+"title-label"+">Día de Paga</label></div>";
  firstRow.innerHTML += "<div class="+"col"+"><label class="+"title-label"+">Cantidad</label></div>";


  divRow.appendChild(firstRow);
  container.appendChild(divRow);
  ul.appendChild(container);

  lista.appendChild(title);
  lista.appendChild(ul);
}

loadInitialInfo()
var totalAmount = 0;
function writeNomina(nomina) {
  var lista = document.getElementById("nominas");


  var firstRow = document.createElement("div");
  firstRow.setAttribute('class', 'row');

  var periodStart = nomina.period_start;
  var periodEnd = nomina.period_end;
  var payDate = nomina.pay_date;
  // var amount = nomina.paid;
  var employees = nomina.employees;

  firstRow.setAttribute('id', "info" + periodStart);
  firstRow.setAttribute('periodStart', periodStart);
  firstRow.setAttribute('periodEnd', periodEnd);
  firstRow.setAttribute('payDate', payDate);
  // firstRow.setAttribute('amount', amount);
  firstRow.setAttribute('employees', JSON.stringify(employees));

  var moreInfoButton = document.createElement("button");
  moreInfoButton.setAttribute("id", "info" + periodStart);
  moreInfoButton.setAttribute("type", "button");
  moreInfoButton.setAttribute("class", "btn btn-light btn-block");
  moreInfoButton.setAttribute("onclick","getAllInfoNomina(id)");
  moreInfoButton.setAttribute("data-toggle","modal");
  moreInfoButton.setAttribute("data-target","#myModal");
  moreInfoButton.innerText = "Ver toda la información";

  
  firstRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+getPrintableDate(periodStart)+"</small></div>";
  firstRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+getPrintableDate(periodEnd)+"</small></div>";
  firstRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+getPrintableDate(payDate)+"</small></div>";
  firstRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+getPrintablePrice(totalAmount)+"</small></div>";

  firstRow.innerHTML += "<br>"
  firstRow.innerHTML += "<br>"


  firstRow.appendChild(moreInfoButton);

  lista.appendChild(firstRow);

}
function addAbsence(id){
  console.log("id = " + id);
  var username = $("#"+id).attr("username");
  var period_end = $("#"+id).attr("periodEnd");

  json_to_send = {
    'username': username,
    'period_end': period_end
  };
  console.log(" per = " + period_end);
  json_to_send = JSON.stringify(json_to_send);
  console.log(json_to_send);
  $.ajax({
    url: 'https://granjalasrosasback.web.app/addAbsence',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'POST',
    dataType: 'text',
    data: json_to_send,
    success: function (data) {
      // alert(data);
      alert("Las ausencia se ha agregado exitosamente.");
      window.location = './nominas.html'
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

function deleteAbsence(id){
  console.log("id = " + id);
  var username = $("#"+id).attr("username");
  var period_end = $("#"+id).attr("periodEnd");

  json_to_send = {
    'username': username,
    'period_end': period_end
  };
  console.log(" per = " + period_end);
  json_to_send = JSON.stringify(json_to_send);
  console.log(json_to_send);
  $.ajax({
    url: 'https://granjalasrosasback.web.app/removeAbsence',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'POST',
    dataType: 'text',
    data: json_to_send,
    success: function (data) {
      // alert(data);
      alert("Las ausencia se ha reducido exitosamente.");
      window.location = './nominas.html'
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

function getAllInfoNomina(nomina) {

  var periodStart = $("#"+nomina).attr("periodStart");
  var periodEnd = $("#"+nomina).attr("periodEnd");
  var payDate = $("#"+nomina).attr("payDate");
  var amount = $("#"+nomina).attr("amount");
  var employees = $("#"+nomina).attr("employees");

  var lista = document.getElementById("allInfo");
  lista.innerHTML = "";

    var periodStartRow = document.createElement("div");
    periodStartRow.setAttribute('class', 'row');
  
    periodStartRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">Fecha de Inicio</small></div>";
    periodStartRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+getPrintableDate(periodStart)+"</small></div>";

    lista.appendChild(periodStartRow);

    var periodEndRow = document.createElement("div");
    periodEndRow.setAttribute('class', 'row');
  
    periodEndRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">Fecha de Finalización</small></div>";
    periodEndRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+getPrintableDate(periodEnd)+"</small></div>";

    lista.appendChild(periodEndRow);

    var payDateRow = document.createElement("div");
    payDateRow.setAttribute('class', 'row');
  
    payDateRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">Día de Paga</small></div>";
    payDateRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+getPrintableDate(payDate)+"</small></div>";

    lista.appendChild(payDateRow);

    var amountRow = document.createElement("div");
    amountRow.setAttribute('class', 'row');
  
    amountRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">Cantidad</small></div>";
    amountRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+getPrintablePrice(totalAmount)+"</small></div>";

    lista.appendChild(amountRow);


    var lista2 = document.getElementById("employeesInfo");
    lista2.innerHTML = "";

    var employeesRow = document.createElement("div");
    employeesRow.setAttribute('class', 'row');
    employeesRow.setAttribute('id', 'employeesRow');
  
    employeesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">Nombre Completo</small></div>";
    employeesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">Ausencias</small></div>";
    employeesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">Deducciones</small></div>";
    employeesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">Cantidad</small></div>";
    employeesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">Pago Neto</small></div>";
    lista2.innerHTML += "</hr>";

    lista2.appendChild(employeesRow);

    employees = JSON.parse(employees);
       
    $.each(employees, function(index, employee) {

      var employeesRow = document.createElement("div");
      employeesRow.setAttribute('class', 'row');

          
      employeesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">"+ employee.name +"</small></div>";
      employeesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">"+ employee.absences_counter +"</small></div>";
      employeesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">"+ getPrintablePrice(employee.deductions) +"</small></div>";
      employeesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">"+ getPrintablePrice(employee.amount) +"</small></div>";
      employeesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">"+ getPrintablePrice(employee.net_pay) +"</small></div>";
      lista2.appendChild(employeesRow);

      var abscensesRow = document.createElement("div");
      abscensesRow.setAttribute('class', 'row');

      var addCol = document.createElement("div");
      addCol.setAttribute('class', 'col');
      
      var addAbsencesButton = document.createElement("button");
      addAbsencesButton.setAttribute("id", employee.username+"periodEnd");
      addAbsencesButton.setAttribute("username", employee.username);
      addAbsencesButton.setAttribute("periodEnd", periodEnd);
      addAbsencesButton.setAttribute("type", "button");
      addAbsencesButton.setAttribute("class", "btn btn-link");
      addAbsencesButton.setAttribute("onclick","addAbsence(id)");
      addAbsencesButton.innerText = "Agregar Ausencia  ";

      var addSpan = document.createElement("span");
      addSpan.setAttribute("class", "fa fa-plus-circle");

      var deleteAbsencesButton = document.createElement("button");
      deleteAbsencesButton.setAttribute("id", employee.username+"periodEnd");
      deleteAbsencesButton.setAttribute("username", employee.username);
      deleteAbsencesButton.setAttribute("periodEnd", periodEnd);
      deleteAbsencesButton.setAttribute("type", "button");
      deleteAbsencesButton.setAttribute("class", "btn btn-link");
      deleteAbsencesButton.setAttribute("onclick","deleteAbsence(id)");
      deleteAbsencesButton.innerText = "Reducir Ausencia  ";

      var deleteCol = document.createElement("div");
      deleteCol.setAttribute('class', 'col');


      var deleteSpan = document.createElement("span");
      deleteSpan.setAttribute("class", "fa fa-minus-circle");

      addAbsencesButton.appendChild(addSpan);
      deleteAbsencesButton.appendChild(deleteSpan);
      

      addCol.appendChild(addAbsencesButton);
      deleteCol.appendChild(deleteAbsencesButton);

      abscensesRow.appendChild(addCol);
      abscensesRow.appendChild(deleteCol);

      // lista2.innerHTML += "<br>"
      lista2.appendChild(abscensesRow);
      lista2.innerHTML += "<br><br>"
      });



    // var resetPasswordButton = document.createElement("button");
    // resetPasswordButton.setAttribute("id", username);
    // resetPasswordButton.setAttribute("type", "button");
    // resetPasswordButton.setAttribute("class", "btn btn-primary btn-block");
    // resetPasswordButton.setAttribute("onclick","resetPassword(id)");
    // resetPasswordButton.innerText = "Reestablecer Contraseña";

    // lista2.appendChild(resetPasswordButton);
    
    var modalfooter = document.getElementById("modalfooter");
    modalfooter.innerHTML = "";

    // var terminateEmployeeButton = document.createElement("button");
    // terminateEmployeeButton.setAttribute("id", username);
    // terminateEmployeeButton.setAttribute("type", "button");
    // terminateEmployeeButton.setAttribute("class", "btn btn-link");
    // terminateEmployeeButton.setAttribute("onclick","terminateEmployee(id)");
    // terminateEmployeeButton.innerText = "Dar de Baja a Empleado";
    
    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "btn btn-danger");
    closeButton.setAttribute("data-dismiss","modal");
    closeButton.innerText = "Cerrar";

    // modalfooter.appendChild(terminateEmployeeButton);
    modalfooter.appendChild(closeButton);

}

function loadNominas() {
    $.ajax({
      url: 'https://granjalasrosasback.web.app/getAllPayCycles',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log(data);

        $.each(data, function(index, nomina) {
          $.each(nomina.employees, function(index, employee) {
            totalAmount +=  parseInt(employee.net_pay);
            });
          writeNomina(nomina);
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
      }
    });
  }

  loadNominas();