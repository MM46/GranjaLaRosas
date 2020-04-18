
const expandDate = function (raw_date, callback) {
  const day = raw_date % 100;
  raw_date = parseInt(raw_date / 100);
  const month = raw_date % 100;
  const year = parseInt(raw_date / 100);
  callback({
    'day': day,
    'month': month,
    'year': year
  });
}

const formatDate = function (date, callback) {
  const raw_date = (date.year * 100 + date.month) * 100 * date.day;
  callback(raw_date);
}

module.exports = {
  expandDate: expandDate
}