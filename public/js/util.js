function formatDate(rawDate) {
  let year = rawDate.substring(0, 4);  
  let month = rawDate.substring(5, 7); 
  let day = rawDate.substring(8, 10);

  return year + month + day;
}

function getPrintableDate(date) {
  return date.substring(6, 8) + '-'
    + date.substring(4, 6) + '-'
    + date.substring(0, 4);
}

function getDateForInput(date) {
  // 2023-09-07
  // return date.substring(6, 8) + '-'
  //   + date.substring(4, 6) + '-'
  //   + date.substring(0, 4);

    return date.substring(0, 4) + '-'
    + date.substring(4, 6) + '-'
    + date.substring(6, 8);
}

function formatDateForInput(date) {
  return date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10);
}

function getPrintablePrice(price) {
  return "$ " + price + ".00";
}

function getPrintablePriceWithZero(price) {
  var i ;
  var newPrice = "";
  for (i = 1; i < price.length; i++) {
    newPrice += price[i] ;
  }
  return "$ " + newPrice + ".00";
}

function hideLoading() {
  var info = document.getElementById("info");
  var loading = document.getElementById("loading");
  if (loading.style.display === "block") {
    loading.style.display = "none";
    info.style.display = "block";
  }
}



function resetPassword(username) {
  json_to_send = {
    "username": username
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://granjalasrosasback.web.app/resetPass',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'PATCH',
    dataType: 'json',
    data: json_to_send,
    success: function (data) {
      alert("La nueva contraseña de " + username + " es:" + data["pass"]);
      console.log("reseting pass");
      // updatePass();
      // window.location = './signup.html'
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });
}
