const { db } = require('../database');

const getManagingUser = function (req, res, next) {
  db.collection('users').doc(req.body.username).get().then(function (doc) {
    if (doc.exists) {
      req.managing_user = doc.data();
      next();
    } else {
      return res.status(400).send('No se encontro al usuario a administrar');
    }
  }).catch(function (_) {
    return res.status(500).send('Error al consultar tabla usuarios');
  });
}

const getManagingEmployee = function (req, res, next) {
  db.collection('employees').doc(req.body.username).get().then(function (doc) {
    if (doc.exists) {
      req.managing_employee = doc.data();
      next();
    } else {
      return res.status(400).send('No se encontro al usuario a administrar');
    }
  }).catch(function (_) {
    return res.status(500).send('Error al consultar tabla usuarios');
  });
}

module.exports = {
  getManagingUser: getManagingUser,
  getManagingEmployee: getManagingEmployee
}