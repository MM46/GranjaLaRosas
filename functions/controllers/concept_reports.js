const { db } = require('../database');

function getAndFilterConcepts(earnings, expenses, body) {
  return new Promise(function (resolve, reject) {
    var concepts = [];
    var acum_expenses = 0;
    var acum_earnings = 0;
    db.collection('concepts').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const array = doc.data().array;
        if (doc.id >= body.from && doc.id <= body.to) {
          for (var x = 0; x < array.length; x++) {
            if (array[x].earning && earnings) {
              acum_earnings = acum_earnings + array[x].cost;
              concepts.push(array[x]);
            } else if (!(array[x].earning) && expenses) {
              acum_expenses = acum_expenses + array[x].cost;
              concepts.push(array[x]);
            }
          }
        }
      });
      resolve({
        'concepts': concepts.sort(function (a, b) {
          return a.date - b.date;
        }),
        'net': acum_earnings - acum_expenses,
        'earnings': acum_earnings,
        'expenses': acum_expenses
      });
    }).catch(function (_) {
      reject('Error al leer conceptos');
    });
  });
}

const getConceptsReport = function (req, res) {
  getAndFilterConcepts(true, true, req.body).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

const getEarningsReport = function (req, res) {
  getAndFilterConcepts(true, false, req.body).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

const getExpensesReport = function (req, res) {
  getAndFilterConcepts(false, true, req.body).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

module.exports = {
  getConceptsReport: getConceptsReport,
  getEarningsReport: getEarningsReport,
  getExpensesReport: getExpensesReport,
}