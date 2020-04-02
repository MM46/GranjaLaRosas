const express = require('express');
const router = express.Router();

const sessions = require('./controllers/sessions')

router.post('/createUser', sessions.createUser);
router.post('/login', sessions.login);
router.post('/logout', sessions.logout);

module.exports = router;