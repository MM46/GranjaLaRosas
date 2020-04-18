const { db } = require('../database');
const utils = require('../utils/utils');

const getOrCreateYear = function (req, res, next) {
  const body = req.body;
  utils.expandDate(body.date, function (date) {
    db.collection('pay_cycles').doc(date.year).get().then(function (doc) {
      req.date = date;
      if (doc.exists) {
        req.pay_cycle = doc.data();
        next();
      } else {
        db.collection('pay_cycles').doc(date.year).set({
          1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [],
          11: [], 12: [],
        }).then(function () {
          db.collection('pay_cycles').doc(date.year).get().then(function (doc) {
            req.pay_cycle = doc.data();
            next();
          });
        });
      }
    }).catch(function (_) {
      return res.status(500).send('Error al consultar ciclos de pago');
    });
  });
}