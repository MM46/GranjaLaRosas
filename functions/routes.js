const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');

const sessions = require('./controllers/sessions');
const nomina = require('./controllers/nomina');
const concepts = require('./controllers/concepts');
const siembras = require('./controllers/siembras');

const concept_reports = require('./controllers/concept_reports');
const siembra_reports = require('./controllers/siembra_reports');

// TODO(mauriciogm97): Remove before deploy.
router.get('/dummyAdmin', sessions.dummyAdmin);

// CRUD endpoints.

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

router.get('/getConcepts', auth.auth, auth.admin, concepts.getConcepts);
router.post('/addConcept', auth.auth, auth.admin, concepts.addConcept);
router.patch('/removeConcept', auth.auth, auth.admin, concepts.removeConcept);
router.patch('/updateConcept', auth.auth, auth.admin, concepts.updateConcept);

router.get('/getSiembras', auth.auth, auth.admin, siembras.getSiembras);
router.post('/addSiembra', auth.auth, auth.admin, siembras.addSiembra);
router.patch('/removeSiembra', auth.auth, auth.admin, siembras.removeSiembra);
router.patch('/updateSiembra', auth.auth, auth.admin, siembras.updateSiembra);

// Report endpoints.

router.get('/getConceptsReport', auth.auth, auth.admin,
  concept_reports.getConceptsReport);
router.get('/getEarningsReport', auth.auth, auth.admin,
  concept_reports.getEarningsReport);
router.get('/getExpensesReport', auth.auth, auth.admin,
  concept_reports.getExpensesReport);

router.get('/getSiembrasBySeason', auth.auth, auth.admin,
  siembra_reports.getSiembrasBySeason);
router.get('/getSiembrasByPlantingDate', auth.auth, auth.admin,
  siembra_reports.getSiembrasByPlantingDate);
router.get('/getSiembrasByHarvestDate', auth.auth, auth.admin,
  siembra_reports.getSiembrasByHarvestDate);

module.exports = router;