const functions = require('firebase-functions');
const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(router);

exports.app = functions.https.onRequest(app);
