const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');

const sessions = require('./controllers/sessions')
const nomina = require('./controllers/nomina')

// TODO(mauriciogm97): Remove before deploy.
router.get('/dummyAdmin', sessions.dummyAdmin);

router.get('/getUsers', auth.auth, auth.admin, sessions.getUsers);
router.get('/getMyUser', auth.auth, sessions.getMyUser);
router.post('/registerEmployee', auth.auth, auth.admin,
  sessions.createUser, nomina.createEmployee);
router.post('/login', sessions.login);
router.post('/logout', auth.auth, sessions.logout);
router.patch('/updatePass', auth.auth, sessions.updatePass);
router.patch('/resetPass', auth.auth, auth.admin, sessions.resetPass);

router.get('/getEmployees', auth.auth, auth.admin, nomina.getEmployees);
router.get('/getMyEmployee', auth.auth, nomina.getMyEmployee);
router.get('/getPayCycles', auth.auth, auth.admin, nomina.getPayCycles);
router.get('/getMyPayHistory', auth.auth, nomina.getMyPayHistory);
router.patch('/updateSalary', auth.auth, auth.admin, nomina.updateSalary);
router.patch('/terminateEmployee', auth.auth, auth.admin,
  nomina.terminateEmployee);
router.patch('/rehireEmployee', auth.auth, auth.admin, nomina.rehireEmployee);
router.post('/newPayCycle', auth.auth, auth.admin, nomina.newPayCycle);
router.post('/resetPayCycle', auth.auth, auth.admin, nomina.resetPayCycle);
router.patch('/registerAbsence', auth.auth, auth.admin,
  nomina.registerAbsence);
router.patch('/deleteAbsence', auth.auth, auth.admin, nomina.deleteAbsence);
router.patch('/deductSalary', auth.auth, auth.admin, nomina.deductSalary);

module.exports = router;