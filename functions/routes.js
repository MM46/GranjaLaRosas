const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');

const sessions = require('./controllers/sessions')
const nomina = require('./controllers/nomina')

// TODO(mauriciogm97): Remove before deploy.
router.get('/dummyAdmin', sessions.dummyAdmin);

router.get('/getUsers', auth.auth, auth.admin, sessions.getUsers);
router.post('/registerEmployee', auth.auth, auth.admin,
  sessions.createUser, nomina.createEmployee);
router.post('/login', sessions.login);
router.post('/logout', auth.auth, sessions.logout);
router.patch('/updatePassUser', auth.auth, sessions.updatePass);
router.patch('/updatePassAdmin', auth.auth, auth.admin, sessions.resetPass);

router.get('/getEmployees', auth.auth, auth.admin, nomina.getEmployees);
router.get('/getPayCycles', auth.auth, auth.admin, nomina.getPayCycles);
router.patch('/updateSalary', auth.auth, auth.admin, nomina.updateSalary);
router.patch('/terminateEmployee', auth.auth, auth.admin,
  nomina.terminateEmployee);
router.post('/newPayCycle', auth.auth, auth.admin, nomina.newPayCycle);
router.post('/resetPayCycle', auth.auth, auth.admin, nomina.resetPayCycle);
router.post('/registerAbsence', auth.auth, auth.admin,
  nomina.registerAbsence);
router.post('/deleteAbsence', auth.auth, auth.admin, nomina.deleteAbsence);
router.post('/deductSalary', auth.auth, auth.admin, nomina.deductSalary);

module.exports = router;