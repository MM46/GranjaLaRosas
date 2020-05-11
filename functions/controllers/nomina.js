const { db, fieldvalue } = require('../database');

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
            'absences': []
          });
      }
    });
  });
  return res.send(body.period_end.toString());
}

const registerAbsence = function (req, res) {
  const body = req.body;
  db.collection('pay_cycles').doc(body.period_end.toString())
    .collection('employees').doc(body.username).update({
      'absences': fieldvalue.arrayUnion(body.absence_date)
    });
  return res.send(body.absence_date.toString());
}

const deleteAbsence = function (req, res) {
  const body = req.body;
  db.collection('pay_cycles').doc(body.period_end.toString())
    .collection('employees').doc(body.username).update({
      'absences': fieldvalue.arrayRemove(body.absence_date)
    });
  return res.send(body.absence_date.toString());
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

const getEmployees = function (req, res) {
  var employees = {};
  db.collection('employees').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      const employee = doc.data();
      if (employee.active) {
        employees[employee.username] = employee;
      }
    });
    return res.send(employees);
  }).catch(function (_) {
    return res.status(500).send('Error al leer empleados');
  })
}

const getPayCycles = function (req, res) {
  var pay_cycles = {};
  db.collection('pay_cycles').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      const pay_cycle = doc.data();
      pay_cycles[pay_cycle.period_end.toString()] = pay_cycle;
    });
    return res.send(pay_cycles);
  }).catch(function (_) {
    return res.status(500).send('Error al leer ciclos de pago');
  })
}

const getMyEmployee = function (req, res) {
  const username = req.user.username;
  db.collection('employees').doc(username).get().then(function (doc) {
    return res.send(doc.data());
  }).catch(function (_) {
    return res.status(500).send('Error al leer ciclos de pago');
  });
}

const getMyPayHistory = function (req, res) {
  const username = req.user.username;
  var pay_history = {};
  db.collection('pay_cycles').get().then(function (querySnapshot) {
    var index = 1;
    const aux = new Promise(function (resolve, reject) {
      querySnapshot.forEach(function (doc) {
        const pay_cycle = doc.data();
        const period_end_str = pay_cycle.period_end.toString();
        db.collection('pay_cycles').doc(period_end_str)
          .collection('employees').doc(username).get().then(function (doc) {
            const employee = doc.data();
            pay_history[period_end_str] = {
              'period_start': pay_cycle.period_start,
              'period_end': pay_cycle.period_end,
              'pay_date': pay_cycle.pay_date,
              'amount': employee.amount,
              'deductions': employee.deductions,
              'net_pay': employee.net_pay,
              'absences': employee.absences
            }
            if (index == querySnapshot.size) {
              resolve();
            }
            index = index + 1;
          });
      });
    });
    aux.then(function () {
      return res.send(pay_history);
    })
  }).catch(function (_) {
    return res.status(500).send('Error al leer los ciclos de pago');
  });
}

module.exports = {
  createEmployee: createEmployee,
  updateSalary: updateSalary,
  terminateEmployee: terminateEmployee,
  rehireEmployee: rehireEmployee,
  newPayCycle: newPayCycle,
  resetPayCycle: newPayCycle,
  registerAbsence: registerAbsence,
  deleteAbsence: deleteAbsence,
  deductSalary: deductSalary,
  getEmployees: getEmployees,
  getMyEmployee: getMyEmployee,
  getPayCycles: getPayCycles,
  getMyPayHistory: getMyPayHistory
}