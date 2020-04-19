const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');

const sessions = require('./controllers/sessions')
const nomina_a = require('./controllers/nominas_admin')

// TODO(mauriciogm97): Remove before deploy.
router.get('/dummyAdmin', sessions.dummyAdmin);

router.post('/registerEmployee', auth.auth, auth.admin,
  sessions.createUser, nomina_a.createEmployee);
router.post('/login', sessions.login);
router.post('/logout', auth.auth, sessions.logout);
router.patch('/updatePassUser', auth.auth, sessions.updatePass);
router.patch('/updatePassAdmin', auth.auth, auth.admin, sessions.resetPass);

router.patch('/updateSalary', auth.auth, auth.admin, nomina_a.updateSalary);
router.patch('/terminateEmployee', auth.auth, auth.admin,
  nomina_a.terminateEmployee);
router.post('/newPayCycle', auth.auth, auth.admin, nomina_a.newPayCycle);
router.post('/resetPayCycle', auth.auth, auth.admin, nomina_a.resetPayCycle);
router.post('/registerAbscense', auth.auth, auth.admin,
  nomina_a.registerAbscense);
router.post('/deleteAbsence', auth.auth, auth.admin, nomina_a.deleteAbsence);
router.post('/deductSalary', auth.auth, auth.admin, nomina_a.deductSalary);

module.exports = router;