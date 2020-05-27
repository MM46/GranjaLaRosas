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
  

getLogin()

function loadHistorial() {
  $.ajax({
    url: 'https://granjalasrosasback.web.app/getMyPayHistory',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      console.log("Historial");
      console.log(data);
      var lista = document.getElementById("historial");
      $.each(data, function(index, historial) {
          var row = document.createElement("div");
          row.setAttribute('class', 'row');

          var startPeriodCol = document.createElement("div");
          startPeriodCol.setAttribute('class', 'col-md-2');
          var startPeriodText = document.createElement("label");
          startPeriodText.setAttribute('class', 'user-label');
          startPeriodText.innerText = historial.period_start;

          var endPeriodCol = document.createElement("div");
          endPeriodCol.setAttribute('class', 'col-md-2');
          var endPeriodText = document.createElement("label");
          endPeriodText.setAttribute('class', 'user-label');
          endPeriodText.innerText = historial.period_end;

          var payDateCol = document.createElement("div");
          payDateCol.setAttribute('class', 'col-md-2');
          var payDateText = document.createElement("label");
          payDateText.setAttribute('class', 'user-label');
          payDateText.innerText = historial.pay_date;

          var amountCol = document.createElement("div");
          amountCol.setAttribute('class', 'col-md-2');
          var amountText = document.createElement("label");
          amountText.setAttribute('class', 'user-label');
          amountText.innerText = "$ " + historial.amount + ".00";

          var deductionsCol = document.createElement("div");
          deductionsCol.setAttribute('class', 'col-md-2');
          var deductionsText = document.createElement("label");
          deductionsText.setAttribute('class', 'user-label');
          deductionsText.innerText = "$ " + historial.deductions + ".00";

          var netPayCol = document.createElement("div");
          netPayCol.setAttribute('class', 'col-md-2');
          var netPayText = document.createElement("label");
          netPayText.setAttribute('class', 'user-label');
          netPayText.innerText = "$ " + historial.net_pay + ".00";

          startPeriodCol.appendChild(startPeriodText);
          row.appendChild(startPeriodCol);

          endPeriodCol.appendChild(endPeriodText);
          row.appendChild(endPeriodCol);

          payDateCol.appendChild(payDateText);
          row.appendChild(payDateCol);

          amountCol.appendChild(amountText);
          row.appendChild(amountCol);

          deductionsCol.appendChild(deductionsText);
          row.appendChild(deductionsCol);

          netPayCol.appendChild(netPayText);
          row.appendChild(netPayCol);


          lista.appendChild(row);

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

      var lista = document.getElementById("historial");
      var row = document.createElement("div");
      row.setAttribute('class', 'row');
      var noneCol = document.createElement("div");
      noneCol.setAttribute('class', 'col-md-12');
      var noneText = document.createElement("label");
      noneText.setAttribute('class', 'user-label');

      noneCol.appendChild(noneText);
      row.appendChild(noneCol);


          lista.appendChild(row);
          noneText.innerText = "No hay historial para este usuario."
      // alert((error_msg['responseText']));
    }
  });
}


loadHistorial()

