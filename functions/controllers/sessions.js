const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const firebase = admin.initializeApp();
const db = firebase.firestore();

const createUser = function (req, res) {
  const body = req.body;
  db.collection('users').doc(body.username).get().then(function (doc) {
    if (doc.exists) {
      return res.status(500).send("El usuario ya existe");
    } else {
      bcrypt.hash(body.pass, 8).then(function (hashed_pass) {
        user = {
          'name': body.name,
          'username': body.username,
          'pass': hashed_pass,
          'tokens': []
        }
        db.collection('users').doc(body.username).set(user);
        return res.send(user);
      }).catch(function (error) {
        return res.status(400).send("Contraseña invalida");
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
        if (match) {
          // TODO: Ocultar el screto en otro archivo.
          const token = jwt.sign(user, "SECRETOPENDIENTE", {
            expiresIn: '7 days'
          });
          user.tokens.push(token);
          db.collection('users').doc(user.username).set(user);
          return res.send(token);
        } else {
          return res.status(500).send("Credenciales inválidas");
        }
      }).catch(function (error) {
        return res.status(500).send("Credenciales inválidas");
      });
    } else {
      return res.status(500).send("Credenciales inválidas");
    }
  });
}

const logout = function (req, res) {
  const body = req.body;
  db.collection('users').doc(body.username).get().then(function (doc) {
    const user = doc.data();
    const index = user.tokens.indexOf(body.token);
    if (index != -1) {
      user.tokens.splice(index, 1);
      db.collection('users').doc(user.username).set(user);
      return res.send(user);
    } else {
      return res.status(400).send("Token not found");
    }
  }).catch(function (error) {
    return res.status(400).send("User not found");
  });
}

module.exports = {
  createUser: createUser,
  login: login,
  logout: logout
}