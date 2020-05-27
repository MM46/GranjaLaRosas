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
  season = unescape(temp[1]);

  temp = parameters[1].split("=");
  seed = unescape(temp[1]);

  temp = parameters[2].split("=");
  planting_date = unescape(temp[1]);

  temp = parameters[3].split("=");
  harvest_date = unescape(temp[1]);

  temp = parameters[4].split("=");
  progress = unescape(temp[1]);

  document.getElementById("season").value = season;
  document.getElementById("seed").value = seed;
  document.getElementById("planting_date").value = planting_date;
  document.getElementById("harvest_date").value = harvest_date;
  document.getElementById("progress").value = progress;

  document.getElementById("season").setAttribute("prevValue", season);
  document.getElementById("seed").setAttribute("prevValue", seed);
  document.getElementById("planting_date").setAttribute("prevValue", planting_date);
  document.getElementById("harvest_date").setAttribute("prevValue", harvest_date);
  document.getElementById("progress").setAttribute("prevValue", progress);
}
getParameters();


$('#guardarCambiosSembradio').on('click', function () {
  let season = $('#season').val();
  let seed = $('#seed').val();
  let planting_date = $('#planting_date').val();
  let harvest_date = $('#harvest_date').val();
  let progress = $('#progress').val();

  let oldSeason = $('#season').attr("prevValue");
  let oldSeed = $('#seed').attr("prevValue");
  let oldPlanting_date = $('#planting_date').attr("prevValue");
  let oldHarvest_date = $('#harvest_date').attr("prevValue");
  let oldProgress = $('#progress').attr("prevValue");


  console.log("old values");
  console.log("season = ", oldSeason);
  console.log("seed = ", oldSeed);
  console.log("planting_date = ", oldPlanting_date);
  console.log("harvest_date = ", oldHarvest_date);
  console.log("progress = ", oldProgress);

  console.log("new values");
  console.log("season = ", season);
  console.log("seed = ", seed);
  console.log("planting_date = ", planting_date);
  console.log("harvest_date = ", harvest_date);
  console.log("progress = ", progress);

  // (year * 100 + month) * 100 + day

  json_to_send = {
    "old": {
      'season': oldSeason,
      'seed': oldSeed,
      'planting_date': oldPlanting_date,
      'harvest_date': oldHarvest_date,
      'progress': oldProgress
    },
    "new": {
      'season': season,
      'seed': seed,
      'planting_date': planting_date,
      'harvest_date': harvest_date,
      'progress': progress
    }
  };

  json_to_send = JSON.stringify(json_to_send);
  
  $.ajax({
    url: 'https://granjalasrosasback.web.app/updateSiembra',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'PATCH',
    dataType: 'text',
    data: json_to_send,
    success: function (data) {
      // alert(data);
      alert("Cambios guardados con Exito");
      window.location = './sembradios.html'
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });

});

$('#eliminarSembradio').on('click', function () {
  // let season = $('#season').val();
  // let seed = $('#seed').val();
  // let planting_date = $('#planting_date').val();
  // let harvest_date = $('#harvest_date').val();
  // let progress = $('#progress').val();
  var alertconfirm = confirm("¿Estas seguro que deseas borrar este Sembradío?");

    if(alertconfirm == true){
    let oldSeason = $('#season').attr("prevValue");
    let oldSeed = $('#seed').attr("prevValue");
    let oldPlanting_date = $('#planting_date').attr("prevValue");
    let oldHarvest_date = $('#harvest_date').attr("prevValue");
    let oldProgress = $('#progress').attr("prevValue");


    // (year * 100 + month) * 100 + day

    json_to_send = {
        'season': season,
        'seed': seed,
        'planting_date': planting_date,
        'harvest_date': harvest_date,
        'progress': progress
    };

    json_to_send = JSON.stringify(json_to_send);
    
    $.ajax({
      url: 'https://granjalasrosasback.web.app/removeSiembra',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'PATCH',
      dataType: 'text',
      data: json_to_send,
      success: function (data) {
        // alert(data);
        alert("Sembradío borrado con Exito");
        window.location = './sembradios.html'
      },
      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }
});
