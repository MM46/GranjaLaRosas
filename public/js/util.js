function formatDate(rawDate) {
  let year = rawDate.substring(0, 4);  
  let month = rawDate.substring(5, 7); 
  let day = rawDate.substring(8, 10);

  return year + month + day;
}

function getPrintableDate(date) {
  return inputDate.substring(0, 4) + '-'
    + inputDate.substring(5, 7) + '-'
    + inputDate.substring(8, 10);
}

function hideLoading() {
  var info = document.getElementById("info");
  var loading = document.getElementById("loading");
  if (loading.style.display === "block") {
    loading.style.display = "none";
    info.style.display = "block";
  }
}