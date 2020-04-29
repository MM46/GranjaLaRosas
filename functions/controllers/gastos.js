const { db, fieldvalue } = require('../database');

function addExpense(req, res) {
  const body = req.body;
  const date_str = body.date.toString();
  db.collection('expenses').doc(date_str).set({
    'array': fieldvalue.arrayUnion({
      'date': body.date,
      'description': body.description,
      'cost': body.cost
    })
  }, { merge: true });
  return res.send(date_str)
}

function removeExpense(req, res) {
  const body = req.body;
  const date_str = body.date.toString();
  db.collection('expenses').doc(date_str).set({
    'array': fieldvalue.arrayRemove({
      'date': body.date,
      'description': body.description,
      'cost': body.cost
    })
  }, { merge: true });
  return res.send(date_str);
}

function updateExpense(req, res) {
  const body = req.body;
  if (body.old.date != body.new.date) {
    addExpense({ 'body': body.new }, res);
    removeExpense({ 'body': body.old }, res);
  } else {
    const date_str = body.old.date.toString();
    db.collection('expenses').doc(date_str).get().then(function (doc) {
      var array = doc.data().array;
      for (let x = 0; x < array.length; x++) {
        if (array[x] == body.old) {
          array[x] = body.new;
        }
      }
      db.collection('expenses').doc(date_str).set({
        'array': array
      });
      return res.send(date_str);
    }).catch(function (_) {
      return res.status(500).send("Error al leer gastos")
    });
  }
}

function getExpenses(req, res) {
  var unordered_expenses = {};
  var ordered_expenses = {};
  db.collection('expenses').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      const array = doc.data().array;
      if (array.length > 0) {
        unordered_expenses[array[0].date.toString()] = array;
      }
    });
    Object.keys(unordered_expenses).sort().forEach(function (key) {
      ordered_expenses[key] = unordered_expenses[key];
    });
    return res.send(ordered_expenses);
  }).catch(function (_) {
    return res.status(500).send("Error al leer gastos")
  });
}

module.exports = {
  addExpense: addExpense,
  removeExpense: removeExpense,
  updateExpense: updateExpense,
  getExpenses: getExpenses
}