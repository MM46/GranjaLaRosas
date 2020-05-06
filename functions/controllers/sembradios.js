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
}

function removeSiembra(req, res) {
  removeSiembraAux.then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  })
}

function updateSiembra(req, res) {
  const body = req.body;
  if (body.old.season != body.new.season) {
    removeSiembraAux(body.old).then(function (_) {
      addSiembraAux(body.new).then(function (data) {
        return res.send(data);
      }).catch(function (err) {
        return res.status(500).send(500);
      });
    }).catch(function (err) {
      return res.status(500).send(500);
    });
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