const { db, fieldvalue } = require('../database');

function addSiembra(req, res) {
  const body = req.body;
  db.collection('siembras').doc(body.season).set({
    'array': fieldvalue.arrayUnion({
      'season': body.season,
      'seed': body.seed,
      'planting_date': body.planting_date,
      'harvest_date': body.harvest_date,
      'progress': body.progress
    })
  }, { merge: true });
  return res.send(body.planting_date.toString())
}

function removeSiembra(req, res) {
  const body = req.body;
  db.collection('siembras').doc(body.season).set({
    'array': fieldvalue.arrayRemove({
      'season': body.season,
      'seed': body.seed,
      'planting_date': body.planting_date,
      'harvest_date': body.harvest_date,
      'progress': body.progress
    })
  }, { merge: true });
  return res.send(body.planting_date.toString());
}

function updateSiembra(req, res) {
  const body = req.body;
  if (body.old.season != body.new.season) {
    addSiembra({ 'body': body.new }, res);
    removeSiembra({ 'body': body.old }, res);
  } else {
    db.collection('siembras').doc(body.old.season).get().then(function (doc) {
      var array = doc.data().array;
      for (let x = 0; x < array.length; x++) {
        if (array[x] == body.old) {
          array[x] = body.new;
        }
      }
      db.collection('siembras').doc(body.old.season).set({
        'array': array
      });
      return res.send(body.new.planting_date.toString());
    }).catch(function (_) {
      return res.status(500).send("Error al leer gastos")
    });
  }
}

function getSiembras(req, res) {
  var siembras = {};
  db.collection('siembras').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      const array = doc.data().array;
      if (array.length > 0) {
        siembras[array[0].planting_date.toString()] = array;
      }
    });
    return res.send(siembras);
  }).catch(function (_) {
    return res.status(500).send("Error al leer gastos")
  });
}

module.exports = {
  addSiembra: addSiembra,
  removeSiembra: removeSiembra,
  updateSiembra: updateSiembra,
  getSiembras: getSiembras
}