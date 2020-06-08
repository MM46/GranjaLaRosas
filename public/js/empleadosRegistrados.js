function agregarSalario(id) {
    var username = id;
    console.log("us = " + username);
    var url = './agregarSalario.html?username=' + encodeURIComponent(username);
    document.location.href = url;
}

function getInfoEmpleado() {
  var x = document.getElementById("usuarios");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


function writeEmployee(employee) {
  var lista = document.getElementById("usuarios");

  lista.innerHTML += "<hr>"

  var firstRow = document.createElement("div");
  firstRow.setAttribute('class', 'row');

  var name = employee.name + " " + employee.lastname1 + " " + employee.lastname2;
  var username = employee.username;
  firstRow.setAttribute('id', "info" + username);
  firstRow.setAttribute('username', username);
  firstRow.setAttribute('name', name);
  firstRow.setAttribute('birth_date', employee.birth_date);
  firstRow.setAttribute('hire_date', employee.hire_date);
  firstRow.setAttribute('salaries', JSON.stringify(employee.salary));


  if(employee.active){
    firstRow.setAttribute('status', "Activo");
  }else{
    firstRow.setAttribute('status', "Inactivo");
  }

  var moreInfoButton = document.createElement("button");
  moreInfoButton.setAttribute("id", "info" + username);
  moreInfoButton.setAttribute("type", "button");
  moreInfoButton.setAttribute("class", "btn btn-light btn-block");
  moreInfoButton.setAttribute("onclick","getAllInfoEmployee(id)");
  moreInfoButton.setAttribute("data-toggle","modal");
  moreInfoButton.setAttribute("data-target","#myModal");
  moreInfoButton.innerText = "Ver toda la información";


  
  firstRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+username+"</small></div>";
  firstRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+name+"</small></div>";

  firstRow.innerHTML += "<br>"
  firstRow.innerHTML += "<br>"
  
  firstRow.appendChild(moreInfoButton);


  lista.appendChild(firstRow);
  
}


function getAllInfoEmployee(user) {

  var username = $("#"+user).attr("username");
  var name = $("#"+user).attr("name");
  var status = $("#"+user).attr("status");
  var birth_date = $("#"+user).attr("birth_date");
  birth_date = getPrintableDate(birth_date);
  var hire_date = $("#"+user).attr("hire_date");
  hire_date = getPrintableDate(hire_date);
  var salaries = $("#"+user).attr("salaries");


  var lista = document.getElementById("allInfo");
  lista.innerHTML = "";

    var usernameRow = document.createElement("div");
    usernameRow.setAttribute('class', 'row');
  
    usernameRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">Usuario</small></div>";
    usernameRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+username+"</small></div>";

    lista.appendChild(usernameRow);

    var nameRow = document.createElement("div");
    nameRow.setAttribute('class', 'row');

    nameRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">Nombre Completo</small></div>";
    nameRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+name+"</small></div>";
    lista.appendChild(nameRow);

    var statusRow = document.createElement("div");
    statusRow.setAttribute('class', 'row');

    if(status == "Activo"){
      statusRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">Estatus</small></div>";
      statusRow.innerHTML += "<div class="+"col"+"><small style = "+"color:green"+">"+status+"</small></div>";
    }else{
      statusRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">Estatus</small></div>";
      statusRow.innerHTML += "<div class="+"col"+"><small style = "+"color:red"+">"+status+"</small></div>";
    }


    lista.appendChild(statusRow);

    var birthDateRow = document.createElement("div");
    birthDateRow.setAttribute('class', 'row');

    birthDateRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">Fecha de Nacimiento</small></div>";
    birthDateRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+birth_date+"</small></div>";
    lista.appendChild(birthDateRow);

    var hireDateRow = document.createElement("div");
    hireDateRow.setAttribute('class', 'row');

    hireDateRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">Fecha de Contratación</small></div>";
    hireDateRow.innerHTML += "<div class="+"col"+"><small class="+"title-label"+">"+hire_date+"</small></div>";
    lista.appendChild(hireDateRow);


    var lista2 = document.getElementById("salariesInfo");
    lista2.innerHTML = "";

    var salariesRow = document.createElement("div");
    salariesRow.setAttribute('class', 'row');
  
    salariesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">Fecha</small></div>";
    salariesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">Cantidad</small></div>";

    lista2.appendChild(salariesRow);

    var datesRow = document.createElement("div");
    datesRow.setAttribute('class', 'row');



    salaries = JSON.parse(salaries);
    $.each(salaries, function(index, salary) {
      var datesRow = document.createElement("div");
      datesRow.setAttribute('class', 'row');
          
      datesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">"+ getPrintableDate(salary.date) +"</small></div>";
      datesRow.innerHTML += "<div class="+"col red"+"><small class="+"title-label"+">"+ getPrintablePrice(salary.amount) +"</small></div>";
      lista2.appendChild(datesRow);
      });
      lista2.innerHTML += "<br>"


    var addSalaryRow = document.createElement("div");
    addSalaryRow.setAttribute('class', 'row');
    addSalaryRow.setAttribute('id', username);
    

    var addSalaryButton = document.createElement("button");
    addSalaryButton.setAttribute("id", username);
    addSalaryButton.setAttribute("type", "button");
    addSalaryButton.setAttribute("class", "btn btn-success btn-block");
    addSalaryButton.setAttribute("onclick","agregarSalario(id)");
    addSalaryButton.innerText = "Agregar Salario";

    lista2.appendChild(addSalaryButton);

    var resetPasswordButton = document.createElement("button");
    resetPasswordButton.setAttribute("id", username);
    resetPasswordButton.setAttribute("type", "button");
    resetPasswordButton.setAttribute("class", "btn btn-primary btn-block");
    resetPasswordButton.setAttribute("onclick","resetPassword(id)");
    resetPasswordButton.innerText = "Reestablecer Contraseña";

    lista2.appendChild(resetPasswordButton);
    
    var modalfooter = document.getElementById("modalfooter");
    modalfooter.innerHTML = "";

    var terminateEmployeeButton = document.createElement("button");
    terminateEmployeeButton.setAttribute("id", username);
    terminateEmployeeButton.setAttribute("type", "button");
    terminateEmployeeButton.setAttribute("class", "btn btn-link");
    terminateEmployeeButton.setAttribute("onclick","terminateEmployee(id)");
    terminateEmployeeButton.innerText = "Dar de Baja a Empleado";
    
    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "btn btn-danger");
    closeButton.setAttribute("data-dismiss","modal");
    closeButton.innerText = "Cerrar";

    modalfooter.appendChild(terminateEmployeeButton);
    modalfooter.appendChild(closeButton);

}

function loadInitialInfo(){

  var lista = document.getElementById("usuarios");

  var title = document.createElement("h2");
  title.innerText = "Empleados Registrados"

  var ul = document.createElement("ul");
  ul.setAttribute("class","list-group list-group-flush");

  var container = document.createElement("div");
  container.setAttribute("class","container");

  var divRow = document.createElement("div");
  divRow.setAttribute("id", "info-usuarios");

  var firstRow = document.createElement("div");
  firstRow.setAttribute("class", "row");

  divRow.innerHTML += "<hr>"
  firstRow.innerHTML += "<div class="+"col"+"><label class="+"title-label"+">Nombre de Usuario</label></div>";
  firstRow.innerHTML += "<div class="+"col"+"><label class="+"title-label"+">Nombre Completo</label></div>";
  divRow.appendChild(firstRow);
  container.appendChild(divRow);
  ul.appendChild(container);

  lista.appendChild(title);
  lista.appendChild(ul);
}

loadInitialInfo()

function loadEmpleados() {

    $.ajax({
      url: 'https://granjalasrosasback.web.app/getAllEmployees',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      },
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log(data);
        $.each(data, function(index, employee) {
          writeEmployee(employee);
        });
        hideLoading();
      },
      error: function (error_msg) {
        alert(error_msg['responseText']);
      }
    });
  }

  function loadEmpleadosByNameInitial() {
    let initial = document.getElementById("searchEmployee").value;
    var lista = document.getElementById("usuarios");
    console.log(initial);
    json_to_send = {
      "initial": initial[0]
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://granjalasrosasback.web.app/getEmployeesByNameInitial',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
        console.log("By Name Initial")
        console.log(data);
        $.each(data, function(index, employee) {
            writeEmployee(employee);
        })
        hideLoading();
        if(lista.childElementCount == 0){
         loadEmpleadosByLastNameInitial();
        }
      },

      error: function (error_msg) {
        alert(error_msg['responseText']);
      }
    });
  }

  function loadEmpleadosByLastNameInitial() {
    var lista = document.getElementById("usuarios");
    let initial = document.getElementById("searchEmployee").value;

    json_to_send = {
      "initial": initial[0]
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://granjalasrosasback.web.app/getEmployeesByLastNameInitial',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
        $.each(data, function(index, employee) {
            writeEmployee(employee);
        });
        hideLoading();
      },
      error: function (error_msg) {
        alert(error_msg['responseText']);
      }
    });
  }

  function loadEmpleadosByName() {
    var lista = document.getElementById("usuarios");
    let name = document.getElementById("searchEmployee").value;

    json_to_send = {
      "name": name
    };
  
    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
      url: 'https://granjalasrosasback.web.app/getEmployeesByName',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
        console.log("By Name")
        console.log(data);
        $.each(data, function(index, employee) {
            writeEmployee(employee);
            
        });
        hideLoading();
        if(lista.childElementCount == 0){
          loadEmpleadosByLastName();
         }
      },

      error: function (error_msg) {
        alert(error_msg['responseText']);
      }
    });
  }

  function loadEmpleadosByLastName() {
    var lista = document.getElementById("usuarios");
    let lastname = document.getElementById("searchEmployee").value;
    json_to_send = {
      "lastname": lastname
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://granjalasrosasback.web.app/getEmployeesByLastName',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken()
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
        $.each(data, function(index, employee) {
            writeEmployee(employee);
        });
        hideLoading();
        if(lista.childElementCount == 0){
          console.log("no hay usuarios encontrados");
         }
      },
      error: function (error_msg) {
        alert(error_msg['responseText']);
      }
    });
  }

  function loadData() {
    let search = document.getElementById("searchEmployee").value;
    console.log(search.length);
    if(search == []){
      var lista = document.getElementById("usuarios");
      lista.innerHTML = "";
      console.log("By username *******************************************");
      loadEmpleados();
    } else if(search.length == 1){
      var lista = document.getElementById("usuarios");
      lista.innerHTML = "";
      console.log("By name initial *******************************************");
      loadEmpleadosByNameInitial();
    }else {
      var lista = document.getElementById("usuarios");
      lista.innerHTML = "";
      console.log("By name *******************************************");
      loadEmpleadosByName();
    }
  }
  loadEmpleados();