const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');
const search = require('./middleware/search')

const sessions = require('./controllers/sessions')
const nomina_a = require('./controllers/nominas_admin')

// TODO(mauriciogm97): Remove before deploy.
router.get('/dummyAdmin', sessions.dummyAdmin);

router.post('/registerEmployee', auth.auth, auth.admin,
  sessions.createUser, nomina_a.createEmployee);
router.post('/login', sessions.login);
router.post('/logout', auth.auth, sessions.logout);
router.patch('/updatePassUser', auth.auth, sessions.updatePassUser);
router.patch('/updatePassAdmin', auth.auth, auth.admin, search.getManagingUser,
  sessions.updatePassAdmin);

module.exports = router;