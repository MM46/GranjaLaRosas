

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

var nominaEspecifica = "";
function getParameters(){
    var parameters = location.search.substring(1).split("&");
  
    var temp = parameters[0].split("=");
    nominaEspecifica = unescape(temp[1]);
    console.log("nominaespecifica = " + nominaEspecifica);

  }
  getParameters();

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
        // console.log("nominas");
        console.log(data);
        var lista = document.getElementById("nominaEspecifica");

        var periodStartRow = document.createElement("div");
        periodStartRow.setAttribute('class', 'row');

        var periodStartCol = document.createElement("div");
        periodStartCol.setAttribute('class', 'col');
        periodStartCol.setAttribute('id', 'period_start');

        var periodStartText = document.createElement("p");
        periodStartText.innerText = "Fecha de Inicio:"

        var periodEndRow = document.createElement("div");
        periodEndRow.setAttribute('class', 'row');

        var periodEndCol = document.createElement("div");
        periodEndCol.setAttribute('class', 'col');
        periodEndCol.setAttribute('id', 'period_end');

        var periodEndText = document.createElement("p");
        periodEndText.innerText = "Fecha de Finalización:"

        var payDateRow = document.createElement("div");
        payDateRow.setAttribute('class', 'row');

        var payDateCol = document.createElement("div");
        payDateCol.setAttribute('class', 'col');
        payDateCol.setAttribute('id', 'pay_date');

        var payDateText = document.createElement("p");
        payDateText.innerText = "Dia de Paga:"
        
        periodStartCol.appendChild(periodStartText);
        periodStartRow.appendChild(periodStartCol);

        periodEndCol.appendChild(periodEndText);
        periodEndRow.appendChild(periodEndCol);

        payDateCol.appendChild(payDateText);
        payDateRow.appendChild(payDateCol);

        lista.appendChild(periodStartRow);
        lista.appendChild(periodEndRow);
        lista.appendChild(payDateRow);

        $.each(data, function(index, nominas) {
            console.log("data = " + index);
            if(nominaEspecifica == index){
                var secondRow = document.createElement("div");
                secondRow.setAttribute('class', 'row');
        
                var periodStartCol2 = document.createElement("div");
                periodStartCol2.setAttribute('class', 'col');
        
                var periodStartText2 = document.createElement("p");
                periodStartText2.innerText = nominas.period_start;
        
                var periodEndCol2 = document.createElement("div");
                periodEndCol2.setAttribute('class', 'col');
        
                var periodEndText2 = document.createElement("p");
                periodEndText2.innerText = nominas.period_end;
        
                var payDateCol2 = document.createElement("div");
                payDateCol2.setAttribute('class', 'col');
        
                var payDateText2 = document.createElement("p");
                payDateText2.innerText = nominas.pay_date;
                
                periodStartCol2.appendChild(periodStartText2);
                periodStartRow.appendChild(periodStartCol2);
        
                periodEndCol2.appendChild(periodEndText2);
                periodEndRow.appendChild(periodEndCol2);
        
                payDateCol2.appendChild(payDateText2);
                payDateRow.appendChild(payDateCol2);
                
                lista.appendChild(secondRow);

                var divisionRow = document.createElement("div");
                divisionRow.setAttribute('class', 'row');
                divisionRow.setAttribute('style', 'background:gray');
                var divisionCol = document.createElement("div");
                divisionCol.setAttribute('class', 'col-12 col-md');
                divisionCol.setAttribute('style', 'background:gray');
                divisionRow.appendChild(divisionCol);
                lista.appendChild(divisionRow);
        
                // var usernameCol = document.createElement("div");
                // usernameCol.setAttribute('class', 'col');

                var thirdRow = document.createElement("div");
                thirdRow.setAttribute('class', 'row');
        
                var usernameCol = document.createElement("div");
                usernameCol.setAttribute('class', "col-2 red h-100");
        
                var usernameText = document.createElement("p");
                usernameText.setAttribute('class', 'user-label');
                usernameText.innerText = "Usuario";

                var amountCol = document.createElement("div");
                amountCol.setAttribute('class', "col-2 red h-100");
        
                var amountText = document.createElement("p");
                amountText.setAttribute('class', 'user-label');
                amountText.innerText = "Cantidad";

                var absencesCol = document.createElement("div");
                absencesCol.setAttribute('class', "col-2 red h-100");
        
                var absencesText = document.createElement("p");
                absencesText.setAttribute('class', 'user-label');
                absencesText.innerText = "Ausencias";

                var deductionsCol = document.createElement("div");
                deductionsCol.setAttribute('class', "col-3 red h-100");
        
                var deductionsText = document.createElement("p");
                deductionsText.setAttribute('class', 'user-label');
                deductionsText.innerText = "Deducciones";

                var netpayCol = document.createElement("div");
                netpayCol.setAttribute('class', "col-3 red h-100");
        
                var netpayText = document.createElement("p");
                netpayText.setAttribute('class', 'user-label');
                netpayText.innerText = "Pago Neto";


                usernameCol.appendChild(usernameText);
                thirdRow.appendChild(usernameCol);

                amountCol.appendChild(amountText);
                thirdRow.appendChild(amountCol);

                absencesCol.appendChild(absencesText);
                thirdRow.appendChild(absencesCol);

                deductionsCol.appendChild(deductionsText);
                thirdRow.appendChild(deductionsCol);

                netpayCol.appendChild(netpayText);
                thirdRow.appendChild(netpayCol);
                
                lista.appendChild(thirdRow);

            $.each(nominas.employees, function(index, empleados) { 
                var divisionRow2 = document.createElement("div");
                divisionRow2.setAttribute('class', 'row');
                divisionRow2.setAttribute('style', 'background:gray');
                var divisionCol2 = document.createElement("div");
                divisionCol2.setAttribute('class', 'col-12 col-md');
                divisionCol2.setAttribute('style', 'background:gray');
                divisionRow2.appendChild(divisionCol2);
                lista.appendChild(divisionRow2);

                var employeeRow = document.createElement("div");
                employeeRow.setAttribute('class', 'row');

                var usernameCol2 = document.createElement("div");
                usernameCol2.setAttribute('class', 'col-2 h-100');
        
                var usernameText2 = document.createElement("h6");
                // usernameText2.setAttribute('class', 'user-label');
                usernameText2.innerText = empleados.username;
                    
                var amountCol2 = document.createElement("div");
                amountCol2.setAttribute('class', 'col-2 h-100');
        
                var amountText2 = document.createElement("h6");
                // amountText2.setAttribute('class', 'user-label');
                amountText2.innerText = "$ " + empleados.amount;

                var absencesCol2 = document.createElement("div");
                absencesCol2.setAttribute('class', 'col-2 h-100');
        
                var absencesText2 = document.createElement("p");
                // absencesText2.setAttribute('class', 'user-label');
                // console.log("absc = " + empleados.abscences);
                if(empleados.absences == ""){
                    absencesText2.innerText = "-";
                }

                var deductionsCol2 = document.createElement("div");
                deductionsCol2.setAttribute('class', 'col-3 h-100');
        
                var deductionsText2 = document.createElement("p");
                // deductionsText2.setAttribute('class', 'user-label');
                deductionsText2.innerText = "$ " + empleados.deductions;

                var netpayCol2 = document.createElement("div");
                netpayCol2.setAttribute('class', 'col-3 h-100');
        
                var netpayText2 = document.createElement("p");
                // netpayText2.setAttribute('class', 'user-label');
                netpayText2.innerText = "$ " + empleados.net_pay;
                    
                usernameCol2.appendChild(usernameText2);
                employeeRow.appendChild(usernameCol2);

                amountCol2.appendChild(amountText2);
                employeeRow.appendChild(amountCol2);

                absencesCol2.appendChild(absencesText2);
                employeeRow.appendChild(absencesCol2);

                deductionsCol2.appendChild(deductionsText2);
                employeeRow.appendChild(deductionsCol2);

                netpayCol2.appendChild(netpayText2);
                employeeRow.appendChild(netpayCol2);

                lista.appendChild(employeeRow);
            });
        }
            })


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