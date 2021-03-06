const functions = require('firebase-functions');
const jwt = require('jsonwebtoken');
const { db } = require('../database');

const config = functions.config();

const auth = function (req, res, next) {
  const token = req.header('Authorization');
  const decoded = jwt.verify(token, config.jwt.secret);
  const username = decoded.username;
  db.collection('users').doc(username).get().then(function (doc) {
    if (doc.exists) {
      req.token = token;
      req.user = doc.data();
      next();
    } else {
      return res.status(400).send('Usuario no encontrado');
    }
  }).catch(function (error) {
    return res.status(400).send('Usuario no encontrado');
  });
}

const admin = function (req, res, next) {
  if (req.user.role == 'admin') {
    next();
  } else {
    return res.status(400).send('El usuario no tiene permiso de administrador');
  }
}

const active = function (req, res, next) {
  const user = req.user;
  if (user.role == 'employee') {
    db.collection('employees').doc(user.username).get().then(function (doc) {
      const employee = doc.data();
      if (employee.active) {
        next();
      } else {
        return res.status(400).send('El empleado ya no está activo');
      }
    });
  } else {
    next();
  }
}

module.exports = {
  auth: auth,
  admin: admin,
  active: active
}