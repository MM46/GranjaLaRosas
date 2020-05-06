const { db, fieldvalue } = require('../database');

function addConceptAux(body) {
  return new Promise(function (resolve, reject) {
    const date_str = body.date.toString();
    db.collection('concepts').doc(date_str).set({
      'array': fieldvalue.arrayUnion({
        'date': body.date,
        'description': body.description,
        'cost': body.cost,
        'earning': body.earning
      })
    }, { merge: true }).then(function () {
      resolve(date_str);
    }).catch(function (_) {
      reject("Error al acceder base de datos");
    });
  });
}

function addConcept(req, res) {
  addConceptAux(req.body).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(date_str)
  });
}

function removeConceptAux(body) {
  return new Promise(function (resolve, reject) {
    const date_str = body.date.toString();
    db.collection('concepts').doc(date_str).set({
      'array': fieldvalue.arrayRemove({
        'date': body.date,
        'description': body.description,
        'cost': body.cost,
        'earning': body.earning
      })
    }, { merge: true }).then(function () {
      resolve(date_str)
    }).catch(function (_) {
      reject('Error al acceder base de datos');
    });
  });
}

function removeConcept(req, res) {
  removeConceptAux(req.body).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

function updateConcept(req, res) {
  const body = req.body;
  if (body.old.date != body.new.date) {
    removeConceptAux(body.old).then(function (_) {
      addConceptAux(body.new).then(function (data) {
        return res.send(data);
      }).catch(function (err) {
        return res.status(500).send(err);
      });
    }).catch(function (err) {
      return res.status(500).send(err);
    });
  } else {
    const date_str = body.old.date.toString();
    db.collection('concepts').doc(date_str).get().then(function (doc) {
      var array = doc.data().array;
      for (let x = 0; x < array.length; x++) {
        if (array[x] == body.old) {
          array[x] = body.new;
        }
      }
      db.collection('concepts').doc(date_str).set({
        'array': array
      });
      return res.send(date_str);
    }).catch(function (_) {
      return res.status(500).send("Error al leer gastos")
    });
  }
}

/**
 * @deprecated Use report functions from ./concept_reports.js
 */
function getConcepts(req, res) {
  var unordered_concepts = {};
  var ordered_concepts = {};
  db.collection('concepts').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      const array = doc.data().array;
      if (array.length > 0) {
        unordered_concepts[array[0].date.toString()] = array;
      }
    });
    Object.keys(unordered_concepts).sort().forEach(function (key) {
      ordered_concepts[key] = unordered_concepts[key];
    });
    return res.send(ordered_concepts);
  }).catch(function (_) {
    return res.status(500).send("Error al leer gastos")
  });
}

module.exports = {
  addConcept: addConcept,
  removeConcept: removeConcept,
  updateConcept: updateConcept,
  getConcepts: getConcepts
}