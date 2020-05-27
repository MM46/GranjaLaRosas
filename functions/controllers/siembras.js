const { db, fieldvalue } = require('../database');

function addSiembraAux(body) {
  return new Promise(function (resolve, reject) {
    db.collection('siembras').doc(body.season).set({
      'array': fieldvalue.arrayUnion({
        'season': body.season,
        'seed': body.seed,
        'planting_date': body.planting_date,
        'harvest_date': body.harvest_date,
        'progress': body.progress
      })
    }, { merge: true }).then(function () {
      resolve(body.planting_date.toString());
    }).catch(function (_) {
      reject("Error al acceder base de datos");
    });
  });
}

function addSiembra(req, res) {
  addSiembraAux(req.body).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

function removeSiembraAux(body) {
  return new Promise(function (resolve, reject) {
    db.collection('siembras').doc(body.season).set({
      'array': fieldvalue.arrayRemove({
        'season': body.season,
        'seed': body.seed,
        'planting_date': body.planting_date,
        'harvest_date': body.harvest_date,
        'progress': body.progress
      })
    }, { merge: true }).then(function () {
      resolve(body.planting_date.toString())
    }).catch(function (_) {
      reject("Error al acceder base de datos");
    });
  });
}

function removeSiembra(req, res) {
  removeSiembraAux(req.body).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  })
}

function updateSiembra(req, res) {
  const body = req.body;
  removeSiembraAux(body.old).then(function (_) {
    addSiembraAux(body.new).then(function (data) {
      return res.send(data);
    }).catch(function (err) {
      return res.status(500).send(err);
    });
  }).catch(function (err) {
    return res.status(500).send(err);
  });
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