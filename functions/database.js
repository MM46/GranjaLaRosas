const admin = require('firebase-admin');
const firebase = admin.initializeApp();
const db = firebase.firestore();
const fieldvalue = admin.firestore.FieldValue;

module.exports = {
  db: db,
  fieldvalue: fieldvalue
}