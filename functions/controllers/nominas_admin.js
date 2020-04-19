const { db, fieldvalue } = require('../database');

const createEmployee = function (req, res) {
  const body = req.body;
  db.collection('employees').doc(body.username).set({
    'username': body.username,
    'name': body.name,
    'lastname1': body.lastname1,
    'lastname2': body.lastname2,
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
  return res.send(body.salary);
}

const terminateEmployee = function (req, res) {
  db.collection('employees').doc(body.username).update({
    'active': false
  })
  return res.send(employee);
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
            'username': employee.username,
            'amount': employee.salary[employee.salary.length - 1].amount,
            'deductions': 0,
            'net_pay': employee.salary[employee.salary.length - 1].amount,
            'abscenses': []
          });
      }
    });
  });
  return res.send(body.period_end);
}

const registerAbscense = function (req, res) {
  const body;
  db.collection('pay_cycles').doc(body.period_end.toString())
    .collection('employees').doc(body.username).update({
      'abscenses': fieldvalue.arrayUnion(body.abscense_date)
    });
}

const deleteAbscense = function (req, res) {
  const body;
  db.collection('pay_cycles').doc(body.period_end.toString())
    .collection('employees').doc(body.username).update({
      'abscenses': fieldvalue.arrayRemove(body.abscense_date)
    });
}

const deductSalary = function (req, res) {
  const body;
  db.collection('pay_cycles').doc(body.period_end.toString())
    .collection('employees').doc(body.username).set({
      'deduction': body.deductions,
      'net_pay': salary - body.deductions
    }, { merge: true });
}

module.exports = {
  createEmployee: createEmployee,
  updateSalary: updateSalary,
  terminateEmployee: terminateEmployee,
  newPayCycle: newPayCycle,
  resetPayCycle: newPayCycle,
  registerAbscense: registerAbscense,
  deleteAbscense: deleteAbscense,
  deductSalary: deductSalary
}