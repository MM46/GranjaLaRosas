const { db, fieldvalue } = require('../database');

const increment1 = fieldValue.increment(1);
const decrement1 = fieldValue.increment(-1);

const createEmployee = function (req, res) {
  const body = req.body;
  db.collection('employees').doc(body.username).set({
    'username': body.username,
    'name': body.name.toUpperCase(),
    'lastname1': body.lastname1.toUpperCase(),
    'lastname2': body.lastname2.toUpperCase(),
    'birth_date': body.birth_date,
    'hire_date': body.hire_date,
    'active': true,
    'salary': [
      {
        'date': body.hire_date,
        'amount': body.salary,
      }
    ]
  });
  return res.send(req.user_data);
}

const updateSalary = function (req, res) {
  const body = req.body;
  db.collection('employees').doc(body.username).update({
    salary: fieldvalue.arrayUnion({
      'date': body.date,
      'amount': body.salary
    })
  });
  return res.send(body.salary.toString());
}

const terminateEmployee = function (req, res) {
  const body = req.body;
  db.collection('employees').doc(body.username).update({
    'active': false
  })
  return res.send(body.username);
}

const rehireEmployee = function (req, res) {
  const body = req.body;
  db.collection('employees').doc(body.username).update({
    'active': true
  })
  return res.send(body.username);
}

const newPayCycle = function (req, res) {
  const body = req.body;
  const str_period_end = body.period_end.toString();
  db.collection('pay_cycles').doc(str_period_end).set({
    'period_start': body.period_start,
    'period_end': body.period_end,
    'pay_date': body.pay_date
  });
  db.collection('employees').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      const employee = doc.data();
      if (employee.active) {
        db.collection('pay_cycles').doc(str_period_end).collection('employees')
          .doc(employee.username).set({
            'name': employee.name + ' ' + employee.lastname1,
            'username': employee.username,
            'amount': employee.salary[employee.salary.length - 1].amount,
            'deductions': 0,
            'net_pay': employee.salary[employee.salary.length - 1].amount,
            'absences_counter': 0
          });
      }
    });
  });
  return res.send(body.period_end.toString());
}

const addAbsence = function (req, res) {
  const body = req.body;
  firebase.collection('pay_cycles').doc(body.period_end.toString())
    .collection('employees').doc(body.username).update({
      'absences_counter': increment1
    });
  return res.send(body.username);
}

const removeAbsence = function (req, res) {
  const body = req.body;
  firebase.collection('pay_cycles').doc(body.period_end.toString())
    .collection('employees').doc(body.username).update({
      'absences_counter': decrement1
    });
  return res.send(body.username);
}

const deductSalary = function (req, res) {
  const body = req.body;
  var deductions;
  db.collection('pay_cycles').doc(body.period_end.toString())
    .collection('employees').doc(body.username).get().then(function (doc) {
      const employee = doc.data();
      const net_pay = employee.amount - body.deductions;
      db.collection('pay_cycles').doc(body.period_end.toString())
        .collection('employees').doc(body.username).update({
          'deduction': body.deductions,
          'net_pay': net_pay
        });
      return res.send(net_pay.toString());
    }).catch(function (err) {
      return res.status(500).send('Error al traer empleado');
    });
}

module.exports = {
  createEmployee: createEmployee,
  updateSalary: updateSalary,
  terminateEmployee: terminateEmployee,
  rehireEmployee: rehireEmployee,
  newPayCycle: newPayCycle,
  resetPayCycle: newPayCycle,
  addAbsence: addAbsence,
  removeAbsence: removeAbsence,
  deductSalary: deductSalary
}