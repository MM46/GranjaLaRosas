function formatDate(raw_date) {
  let year = inputDate.substring(0, 4);  
  let month = inputDate.substring(5, 7); 
  let day = inputDate.substring(8, 10);

  return year + month + day;
}

function getDisplayableDate(date) {
  return inputDate.substring(0, 4) + '-'
    + inputDate.substring(5, 7) + '-'
    + inputDate.substring(8, 10);
}