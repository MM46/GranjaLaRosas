

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

function nominaEspecifica(id) {
  console.log("nominaespecifica = " + id);
  var nomina = id
      url = './nominaEspecifica.html?nomina=' + encodeURIComponent(nomina);
  document.location.href = url;
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
        console.log("nominas");
        console.log(data);
        var lista = document.getElementById("nominas");

        var firstRow = document.createElement("div");
        firstRow.setAttribute('class', 'row');
        // firstRow.setAttribute('style', 'background:#22B3CD');

        var periodStartCol = document.createElement("div");
        periodStartCol.setAttribute('class', 'col');
        periodStartCol.setAttribute('id', 'period_start');

        var periodStartText = document.createElement("h4");
        periodStartText.setAttribute('class', 'title-label');
        // firstRow.setAttribute('style', 'color:white');
        periodStartText.innerText = "Fecha de Inicio:"

        var periodEndCol = document.createElement("div");
        periodEndCol.setAttribute('class', 'col');
        periodEndCol.setAttribute('id', 'period_end');

        var periodEndText = document.createElement("h4");
        periodEndText.setAttribute('class', 'title-label');
        periodEndText.innerText = "Fecha de Finalización:"

        var payDateCol = document.createElement("div");
        payDateCol.setAttribute('class', 'col');
        payDateCol.setAttribute('id', 'pay_date');

        var payDateText = document.createElement("h4");
        payDateText.setAttribute('class', 'title-label');
        payDateText.innerText = "Dia de Paga:"
        
        periodStartCol.appendChild(periodStartText);
        firstRow.appendChild(periodStartCol);

        periodEndCol.appendChild(periodEndText);
        firstRow.appendChild(periodEndCol);

        payDateCol.appendChild(payDateText);
        firstRow.appendChild(payDateCol);

        lista.appendChild(firstRow);
        
        var divRow = document.createElement("div");
        divRow.setAttribute('class', 'row');
        divRow.setAttribute('style', 'background:gray');
        lista.appendChild(divRow);

        $.each(data, function(index, nominas) {
          var secondRow = document.createElement("div");
          secondRow.setAttribute('class', 'row');
  
          var periodStartCol2 = document.createElement("div");
          periodStartCol2.setAttribute('class', 'col');
          // periodStartCol2.setAttribute('id', 'period_start');
  
          var periodStartText2 = document.createElement("p");
          periodStartText2.setAttribute('class', 'title-label');
          periodStartText2.innerText = nominas.period_start;
  
          var periodEndCol2 = document.createElement("div");
          periodEndCol2.setAttribute('class', 'col');
          // periodEndCol2.setAttribute('id', 'period_end');
  
          var periodEndText2 = document.createElement("p");
          periodEndText2.setAttribute('class', 'title-label');
          periodEndText2.innerText = nominas.period_end;
  
          var payDateCol2 = document.createElement("div");
          payDateCol2.setAttribute('class', 'col');
          // payDateCol2.setAttribute('id', 'pay_date');
  
          var payDateText2 = document.createElement("p");
          payDateText2.setAttribute('class', 'title-label');
          payDateText2.innerText = nominas.pay_date;
          
          periodStartCol2.appendChild(periodStartText2);
          secondRow.appendChild(periodStartCol2);
  
          periodEndCol2.appendChild(periodEndText2);
          secondRow.appendChild(periodEndCol2);
  
          payDateCol2.appendChild(payDateText2);
          secondRow.appendChild(payDateCol2);

          var employeesCol = document.createElement("div");
          employeesCol.setAttribute('class', 'col');
          employeesCol.setAttribute('class', 'btn btn-info btn-lg');
          employeesCol.setAttribute('style',"display: block;");
          employeesCol.setAttribute('id', index);
          employeesCol.setAttribute("onclick","nominaEspecifica(id)");
          var employeesSpan = document.createElement("span");
          employeesSpan.setAttribute('class', 'fa fa-arrow-circle-right');
          employeesCol.appendChild(employeesSpan);
          secondRow.appendChild(employeesCol);

          lista.appendChild(secondRow);
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