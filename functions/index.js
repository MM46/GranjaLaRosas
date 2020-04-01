const functions = require('firebase-functions');
const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(router);

exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
