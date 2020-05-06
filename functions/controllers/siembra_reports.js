const { db } = require('../database');

function quantifySeason(season) {
  var year = parseInt(season.substring(0, 4));
  var weather_season = season.substring(4, season.lenth);
  switch (weather_season) {
    case 'invierno':
      return year * 10 + 1;
    case 'primavera':
      return year * 10 + 2;
    case 'verano':
      return year * 10 + 3;
    case 'otoño':
      return year * 10 + 4;
    default:
      return 2000;
  }
}

function getAndFilterSiembras(condition) {
  var siembras = [];
  return new Promise(function (resolve, reject) {
    db.collection('siembras').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const array = doc.data().array;
        for (var x = 0; x < array.length; x++) {
          if (condition(array[x])) {
            siembras.push(array[x]);
          }
        }
        resolve(siembras.sort(function (a, b) {
          var bySeason = quantifySeason(a.season) - quantifySeason(b.season);
          if (bySeason != 0) {
            return bySeason;
          }
          var byPlantingDate = a.planting_date - b.planting_date;
          if (byPlantingDate != 0) {
            return byPlantingDate;
          }
          return a.harvest_date - b.harvest_date;
        }));
      })
    }).catch(function (_) {
      reject('Error al acceder a base de datos')
    });
  });
}

function getSiembrasBySeason(req, res) {
  const body = req.body;
  getAndFilterSiembras(function (siembra) {
    const quantified_season = quantifySeason(siembra.season);
    return (quantified_season >= quantifySeason(body.from) &&
      quantified_season <= quantifySeason(body.to));
  }).then(function (data) {
    res.send(data);
  }).catch(function (err) {
    res.status(500).send(err);
  });
}

function getSiembrasByPlantingDate(req, res) {
  const body = req.body;
  getAndFilterSiembras(function (siembra) {
    return (siembra.planting_date >= body.from &&
      siembra.planting_date <= body.to);
  }).then(function (data) {
    res.send(data);
  }).catch(function (err) {
    res.status(500).send(err);
  });
}

function getSiembrasByHarvestDate(req, res) {
  const body = req.body;
  getAndFilterSiembras(function (siembra) {
    return (siembra.harvest_date >= body.from &&
      siembra.harvest_date <= body.to);
  }).then(function (data) {
    res.send(data);
  }).catch(function (err) {
    res.status(500).send(err);
  });
}

module.exports = {
  getSiembrasBySeason: getSiembrasBySeason,
  getSiembrasByPlantingDate: getSiembrasByPlantingDate,
  getSiembrasByHarvestDate: getSiembrasByHarvestDate
}