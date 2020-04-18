const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');

const sessions = require('./controllers/sessions')
const nomina = require('./controllers/nominas_admin')

// TODO(mauriciogm97): Remove before deploy.
router.get('/dummyAdmin', sessions.dummyAdmin);

router.post('/createUser', auth.auth, auth.admin, sessions.createUser);
router.post('/login', sessions.login);
router.post('/logout', auth.auth, sessions.logout);
router.patch('/updatePassUser', auth.auth, sessions.updatePassUser);
router.patch('/updatePassAdmin', auth.auth, auth.admin, sessions.updatePassAdmin);

module.exports = router;