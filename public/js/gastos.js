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
// checkingAdmin()


function editarGasto(id) {
    console.log("id = ", id);
    var date = document.getElementById(id + 'date').innerText,
    description = document.getElementById(id + 'description').innerText,
    cost = document.getElementById(id + 'cost').innerText,
        url = './editarGasto.html?date=' + encodeURIComponent(date)  + '&description=' + encodeURIComponent(description) + '&cost=' + encodeURIComponent(cost);
    document.location.href = url;
}

function removerGasto(id) {

  var alertconfirm = confirm("¿Estas seguro que deseas borrar este Gasto?");

  if(alertconfirm == true){
      let date = document.getElementById(id + 'date').innerText;
      let cost = document.getElementById(id + 'cost').innerText;
      let description = document.getElementById(id + "description").innerText;

      json_to_send = {
        "date": date,
        "description": description,
        "cost": cost
      };
    
      json_to_send = JSON.stringify(json_to_send);
    
      $.ajax({
        url: 'https://granjalasrosasback.web.app/removeExpense',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        method: 'PATCH',
        dataType: 'text',
        data: json_to_send,
        success: function (data) {
          alert("Gasto eliminado");
          window.location = './gastos.html'

        },
        error: function (error_msg) {
          alert((error_msg['responseText']));
        }
      });
  }
}


function loadGastos() {

  let fromDate = $('#from').val();
  let toDate = $('#to').val();

  let fromYear = fromDate.substring(0, 4);  
  let fromMonth = fromDate.substring(5, 7); 
  let fromDay = fromDate.substring(8, 10);

  let toYear = toDate.substring(0, 4);  
  let toMonth = toDate.substring(5, 7); 
  let toDay = toDate.substring(8, 10);

  let from = fromYear + fromMonth + fromDay;
  let to = toYear + toMonth + toDay;

  // console.log("from: " + parseInt(from) + " to: " + to);

  json_to_send = {
    "from": parseInt(from),
    "to": parseInt(to)
  };

  json_to_send = JSON.stringify(json_to_send);
  console.log(json_to_send);
    $.ajax({
      url: 'https://granjalasrosasback.web.app/getExpensesReport',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
        // console.log("Gastos");
        console.log(data);
        var lista = document.getElementById("gastos");
        lista.innerHTML = "";

        var infoRow = document.createElement("div");
        infoRow.setAttribute('class', 'user-label');
        var infoCol = document.createElement("div");
        infoCol.setAttribute('class', 'user-label');
        var infoText = document.createElement("p");
        infoText.setAttribute('class', 'user-label');
        infoText.innerText = "";

        infoCol.appendChild(infoText);
        infoRow.appendChild(infoCol);
        lista.appendChild(infoRow);

        var ingresosRow = document.createElement("div");
        ingresosRow.setAttribute('class', 'user-label');

        var ingresosCol = document.createElement("div");
        ingresosCol.setAttribute('class', 'col');
        var ingresosText = document.createElement("p");
        ingresosText.setAttribute('class', 'user-label');
        ingresosText.innerText = "Ingresos:";

        var ingresosCol2 = document.createElement("div");
        ingresosCol2.setAttribute('class', 'col');
        var ingresosText2 = document.createElement("p");
        ingresosText2.setAttribute('class', 'user-label');
        ingresosText2.innerText = "$" + data.earnings + ".00";

        ingresosCol.appendChild(ingresosText);
        ingresosRow.appendChild(ingresosCol);
        ingresosCol2.appendChild(ingresosText2);
        ingresosRow.appendChild(ingresosCol2);

        lista.appendChild(ingresosRow);

        var gastosRow = document.createElement("div");
        gastosRow.setAttribute('class', 'user-label');
        var gastosCol = document.createElement("div");
        gastosCol.setAttribute('class', 'user-label');
        var gastosText = document.createElement("p");
        gastosText.setAttribute('class', 'user-label');
        gastosText.innerText = "Gastos: $" + data.expenses + ".00";

        gastosCol.appendChild(gastosText);
        gastosRow.appendChild(gastosCol);
        lista.appendChild(gastosRow);

        var utilidadNetaRow = document.createElement("div");
        utilidadNetaRow.setAttribute('class', 'user-label');
        var utilidadNetaCol = document.createElement("div");
        utilidadNetaCol.setAttribute('class', 'user-label');
        var utilidadNetaText = document.createElement("p");
        utilidadNetaText.setAttribute('class', 'user-label');
        // dateText.setAttribute('id', index+'date');
        utilidadNetaText.innerText = "Utilidad Neta: $" + data.net + ".00";

        utilidadNetaCol.appendChild(utilidadNetaText);
        utilidadNetaRow.appendChild(utilidadNetaCol);
        lista.appendChild(utilidadNetaRow);

        var divisionRow = document.createElement("div");
        divisionRow.setAttribute('class', 'user-label');
        var divisionCol = document.createElement("div");
        divisionCol.setAttribute('class', 'user-label');
        var divisionText = document.createElement("p");
        divisionText.setAttribute('class', 'user-label');
        // dateText.setAttribute('id', index+'date');
        divisionText.innerText = "";

        divisionCol.appendChild(divisionText);
        divisionRow.appendChild(divisionCol);
        lista.appendChild(divisionRow);
        
        var row = document.createElement("div");
        row.setAttribute('class', 'row');
        var dateCol = document.createElement("div");
        dateCol.setAttribute('class', 'col red');
        var dateText = document.createElement("p");
        dateText.setAttribute('class', 'user-label');
        // dateText.setAttribute('id', index+'date');
        dateText.innerText = "Fecha";

        dateCol.appendChild(dateText);
        row.appendChild(dateCol);
        lista.appendChild(row);

        var costCol = document.createElement("div");
        costCol.setAttribute('class', 'col red');
        var costText = document.createElement("p");
        costText.setAttribute('class', 'user-label');
        // dateText.setAttribute('id', index+'date');
        costText.innerText = "Costo";

        costCol.appendChild(costText);
        row.appendChild(costCol);
        lista.appendChild(row);

        var earningCol = document.createElement("div");
        earningCol.setAttribute('class', 'col red');
        var earningText = document.createElement("p");
        earningText.setAttribute('class', 'user-label');
        earningText.innerText = "Ganancias";

        earningCol.appendChild(earningText);
        row.appendChild(earningCol);
        lista.appendChild(row);


        var descriptionCol = document.createElement("div");
        descriptionCol.setAttribute('class', 'col red');
        var descriptionText = document.createElement("p");
        descriptionText.setAttribute('class', 'user-label');
        descriptionText.innerText = "Descripción";

        descriptionCol.appendChild(descriptionText);
        row.appendChild(descriptionCol);
        lista.appendChild(row);
        

        $.each(data, function(index, gastos) {
            // console.log(gastos.date);

          $.each(gastos, function(index2, gasto) {
            var row2 = document.createElement("div");
            row2.setAttribute('class', 'row');
            var dateCol2 = document.createElement("div");
            dateCol2.setAttribute('class', 'col');
            var dateText2 = document.createElement("p");
            dateText2.setAttribute('class', 'user-label');
            dateText2.setAttribute('id', index+'date');

             let date = gasto.date;
          
             let day = date%100;
             date = parseInt(date/100);
             let month = date%100;
             let year = parseInt(date/100);
          
            date = day +"/"+ month +"/"+ year;

            dateText2.innerText = date;

            dateCol2.appendChild(dateText2);
            row2.appendChild(dateCol2);
            lista.appendChild(row2);

            var costCol2 = document.createElement("div");
            costCol2.setAttribute('class', 'col');
            var costText2 = document.createElement("p");
            costText2.setAttribute('class', 'user-label');
            costText2.setAttribute('id', index+'cost');
            costText2.innerText = "$ " + gasto.cost;

            costCol2.appendChild(costText2);
            row2.appendChild(costCol2);
            lista.appendChild(row2);

            var earningCol2 = document.createElement("div");
            earningCol2.setAttribute('class', 'col');
            var earningText2 = document.createElement("p");
            earningText2.setAttribute('class', 'user-label');
            earningText2.setAttribute('id', index+'earning');
            if(gasto.earning){
              earningText2.innerText = "$ " + gasto.earning + ".00";
            }else{
              earningText2.innerText = "$ 0.00" ;
            }

            earningCol2.appendChild(earningText2);
            row2.appendChild(earningCol2);
            lista.appendChild(row2);


            var descriptionCol2 = document.createElement("div");
            descriptionCol2.setAttribute('class', 'col');
            var descriptionText2 = document.createElement("p");
            descriptionText2.setAttribute('class', 'user-label');
            descriptionText2.setAttribute('id', index+'description');
            descriptionText2.innerText = gasto.description;

            descriptionCol2.appendChild(descriptionText2);
            row2.appendChild(descriptionCol2);
            lista.appendChild(row2);

           });
        })
        var loading = document.getElementById("loading");
        var info = document.getElementById("info");
        var loading = document.getElementById("loading");
        // if (loading.style.display == "block") {
          loading.style.display = "block";
        //   info.style.display = "block";
        // }
      },

      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }


  // loadGastos()


