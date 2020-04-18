const functions = require('firebase-functions');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generatePassword = require('password-generator');
const { db } = require('../database');

const config = functions.config();

// TODO(mauriciogm97): Remove before deploy.
const dummyAdmin = function (req, res) {
  const pass = '12345678';
  bcrypt.hash(pass, 8).then(function (hashed_pass) {
    const user = {
      'name': 'Admin',
      'username': 'admin',
      'pass': hashed_pass,
      'tokens': [],
      'admin': true,
    }
    db.collection('users').doc('admin').set(user);
    return res.send(user);
  }).catch(function (error) {
    return res.status(400).send('Contraseña invalida');
  });
}

const createUser = function (req, res) {
  const body = req.body;
  db.collection('users').doc(body.username).get().then(function (doc) {
    if (doc.exists) {
      return res.status(500).send('El usuario ya existe');
    } else {
      const pass = generatePassword(8, false, /[\w\d\?\-]/);
      bcrypt.hash(pass, 8).then(function (hashed_pass) {
        const user = {
          'username': body.username,
          'pass': hashed_pass,
          'tokens': [],
          'admin': false,
        };
        const user_data = {
          'username': body.username,
          'pass': pass
        };
        db.collection('users').doc(body.username).set(user);
        return res.send(user_data);
      }).catch(function (error) {
        return res.status(500).send('Error al generar contraseña');
      });
    }
  }).catch(function (error) {
    return res.status(400).send(error);
  });
}

const login = function (req, res) {
  const body = req.body;
  db.collection('users').doc(body.username).get().then(function (doc) {
    if (doc.exists) {
      const user = doc.data();
      bcrypt.compare(body.pass, user.pass).then(function (match) {
        console.log(config);
        if (match) {
          const token = jwt.sign({
            username: user.username
          }, config.jwt.secret, {
            expiresIn: '7 days'
          });
          user.tokens.push(token);
          db.collection('users').doc(user.username).set(user);
          return res.send(token);
        } else {
          return res.status(500).send('Credenciales inválidas');
        }
      }).catch(function (error) {
        return res.status(500).send('Credenciales inválidas');
      });
    } else {
      return res.status(500).send('Credenciales inválidas');
    }
  });
}

const logout = function (req, res) {
  const user = req.user;
  const token = req.token;
  const index = user.tokens.indexOf(token);
  if (index != -1) {
    user.tokens.splice(index, 1);
    db.collection('users').doc(user.username).set(user);
    return res.send(user);
  } else {
    return res.status(400).send('Token not found');
  }
}

const updatePassUser = function (req, res) {
  var user = req.user;
  const old_pass = req.body.old_pass;
  const new_pass = req.body.new_pass;
  bcrypt.compare(old_pass, user.pass).then(function (match) {
    bcrypt.hash(new_pass, 8).then(function (hashed_pass) {
      user.pass = hashed_pass;
      db.collection('users').doc(user.username).set(user);
      res.send(user);
    }).catch(function (error) {
      return res.status(500).send('La nueva conttraseña no es valida');
    });
  }).catch(function (error) {
    return res.status(500).send('La contraseña anterior no coincide');
  });
}

const updatePassAdmin = function (req, res) {
  db.collection('users').doc(req.body.username).get().then(function (doc) {
    if (doc.exists) {
      var user = doc.data();
      const pass = generatePassword(8, false, /[\w\d\?\-]/);
      bcrypt.hash(pass, 8).then(function (hashed_pass) {
        user.pass = hashed_pass;
        const user_data = {
          'username': user.username,
          'pass': pass
        };
        db.collection('users').doc(user.username).set(user);
        return res.send(user_data);
      }).catch(function (error) {
        return res.status(500).send('Error al generar contraseña');
      });
    } else {
      return res.status(400).send('No se encontró el usuario');
    }
  });
}

module.exports = {
  // TODO(mauriciogm97): Remove dummyAdmin before deploy.
  dummyAdmin: dummyAdmin,
  createUser: createUser,
  login: login,
  logout: logout,
  updatePassUser: updatePassUser,
  updatePassAdmin: updatePassAdmin,
}