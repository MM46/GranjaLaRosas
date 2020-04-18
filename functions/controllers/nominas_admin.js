const functions = require('firebase-functions');
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
    'current_salary': body.current_salary
  });
  return res.send(user_data);
}

const updateSalary = function (req, res) {

}

module.exports = {
  createEmployee: createEmployee
}