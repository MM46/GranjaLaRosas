const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');

const sessions = require('./controllers/sessions');
const nomina = require('./controllers/nomina');
const concepts = require('./controllers/concepts');
const siembras = require('./controllers/siembras');

const concept_reports = require('./controllers/concept_reports');
const siembra_reports = require('./controllers/siembra_reports');
const nomina_reports = require('./controllers/nomina_reports');

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

router.patch('/updateSalary', auth.auth, auth.admin, nomina.updateSalary);
router.patch('/terminateEmployee', auth.auth, auth.admin,
  nomina.terminateEmployee);
router.patch('/rehireEmployee', auth.auth, auth.admin, nomina.rehireEmployee);
router.post('/newPayCycle', auth.auth, auth.admin, nomina.newPayCycle);
router.post('/resetPayCycle', auth.auth, auth.admin, nomina.resetPayCycle);
router.post('/addAbsence', auth.auth, auth.admin, nomina.addAbsence);
router.post('/removeAbsence', auth.auth, auth.admin, nomina.removeAbsence);
router.patch('/deductSalary', auth.auth, auth.admin, nomina.deductSalary);

router.get('/getConcepts', auth.auth, auth.admin, concepts.getConcepts);
router.post('/addConcept', auth.auth, auth.admin, concepts.addConcept);
router.patch('/removeConcept', auth.auth, auth.admin, concepts.removeConcept);
router.patch('/updateConcept', auth.auth, auth.admin, concepts.updateConcept);

router.get('/getSiembras', auth.auth, siembras.getSiembras);
router.post('/addSiembra', auth.auth, siembras.addSiembra);
router.patch('/removeSiembra', auth.auth, siembras.removeSiembra);
router.patch('/updateSiembra', auth.auth, siembras.updateSiembra);

// Report endpoints.

router.post('/getConceptsReport', auth.auth, auth.admin,
  concept_reports.getConceptsReport);
router.post('/getEarningsReport', auth.auth, auth.admin,
  concept_reports.getEarningsReport);
router.post('/getExpensesReport', auth.auth, auth.admin,
  concept_reports.getExpensesReport);

router.post('/getSiembrasBySeason', auth.auth,
  siembra_reports.getSiembrasBySeason);
router.post('/getSiembrasByPlantingDate', auth.auth,
  siembra_reports.getSiembrasByPlantingDate);
router.post('/getSiembrasByHarvestDate', auth.auth,
  siembra_reports.getSiembrasByHarvestDate);

router.get('/getAllEmployees', auth.auth, auth.admin,
  nomina_reports.getAllEmployees);
router.post('/getEmployeesByNameInitial', auth.auth, auth.admin,
  nomina_reports.getEmployeesByNameInitial);
router.post('/getEmployeesByLastNameInitial', auth.auth, auth.admin,
  nomina_reports.getEmployeesByLastNameInitial);
router.post('/getEmployeesByName', auth.auth, auth.admin,
  nomina_reports.getEmployeesByName);
router.post('/getEmployeesByLastName', auth.auth, auth.admin,
  nomina_reports.getEmployeesByLastName);
router.get('/getMyEmployee', auth.auth, nomina_reports.getMyEmployee);
router.get('/getAllPayCycles', auth.auth, auth.admin,
  nomina_reports.getAllPayCycles);
router.post('/getPayCyclesByDateRange', auth.auth, auth.admin,
  nomina_reports.getPayCyclesByDateRange);
router.get('/getMyFullPayHistory', auth.auth,
  nomina_reports.getMyFullPayHistory);
router.post('/getMyPayHistoryByDateRange', auth.auth,
  nomina_reports.getMyPayHistoryByDateRange);


module.exports = router;