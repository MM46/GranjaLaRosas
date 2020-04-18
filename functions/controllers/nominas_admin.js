const { db } = require('../database');

const createEmployee = function (req, res) {
  const body = req.body;
  db.collection('employees').doc(body.username).set({
    'username': body.username,
    'name': body.name,
    'lastname_1': body.lastname_1,
    'lastname_2': body.lastname_2,
    'birth_date': body.birthdate,
    'hire_date': body.hire_date,
    'active': true,
    'salary': [
      {
        'date': body.hire_date,
        'amount': body.salary,
      }
    ],
    'abscenses': []
  });
  return res.send(user_data);
}

const updateSalary = function (req, res) {
  const employee = req.managing_employee;
  const body = req.body;
  employee.salary.push({
    'date': body.date,
    'amount': body.salary
  });
  db.collection('employees').doc(employee.username).set(employee);
  return res.send(employee);
}

const terminateEmployee = function (req, res) {
  const employee = req.managing_employee;
  employee.active = false;
  db.collection('employees').doc(employee.username).set(employee);
  return res.send(employee);
}

const newPayCycle = function (req, res) {
  return res.send("NOT IMPLEMENTED");
}

module.exports = {
  createEmployee: createEmployee,
  updateSalary: updateSalary,
  terminateEmployee: terminateEmployee,
  newPayCycle: newPayCycle
}