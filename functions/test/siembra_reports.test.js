const request = require('request-promise');
const assert = require('assert');

function addSiembra(token, body) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/addSiembra',
    body: body
  }, function (_, _, _) { });
}

async function addSiembras(token) {
  await addSiembra(token, {
    'season': '2018otoño',
    'seed': 'frijol',
    'planting_date': 20181100,
    'harvest_date': 20181130,
    'progress': 0
  });
  await addSiembra(token, {
    'season': '2019invierno',
    'seed': 'frijol',
    'planting_date': 20190100,
    'harvest_date': 20190130,
    'progress': 0
  });
  await addSiembra(token, {
    'season': '2019primavera',
    'seed': 'frijol',
    'planting_date': 20190300,
    'harvest_date': 20190330,
    'progress': 0
  });
  await addSiembra(token, {
    'season': '2019verano',
    'seed': 'frijol',
    'planting_date': 20190600,
    'harvest_date': 20190630,
    'progress': 0
  });
  await addSiembra(token, {
    'season': '2019otoño',
    'seed': 'frijol',
    'planting_date': 20191000,
    'harvest_date': 20191030,
    'progress': 0
  });
  return addSiembra(token, {
    'season': '2020invierno',
    'seed': 'frijol',
    'planting_date': 20200100,
    'harvest_date': 20200130,
    'progress': 0
  });
}

function getSiembrasBySeason_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getSiembrasBySeason',
    body: {
      'from': '2019invierno',
      'to': '2019otoño',
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify([
      {
        'season': '2019invierno',
        'seed': 'frijol',
        'planting_date': 20190100,
        'harvest_date': 20190130,
        'progress': 0
      }, {
        'season': '2019primavera',
        'seed': 'frijol',
        'planting_date': 20190300,
        'harvest_date': 20190330,
        'progress': 0
      }, {
        'season': '2019verano',
        'seed': 'frijol',
        'planting_date': 20190600,
        'harvest_date': 20190630,
        'progress': 0
      }, {
        'season': '2019otoño',
        'seed': 'frijol',
        'planting_date': 20191000,
        'harvest_date': 20191030,
        'progress': 0
      }
    ])) == 0);
  });
}

function getSiembrasByPlantingDate_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getSiembrasByPlantingDate',
    body: {
      'from': 20190100,
      'to': 20190330,
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify([
      {
        'season': '2019invierno',
        'seed': 'frijol',
        'planting_date': 20190100,
        'harvest_date': 20190130,
        'progress': 0
      }, {
        'season': '2019primavera',
        'seed': 'frijol',
        'planting_date': 20190300,
        'harvest_date': 20190330,
        'progress': 0
      }
    ])) == 0);
  });
}

function getSiembrasByHarvestDate_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getSiembrasByHarvestDate',
    body: {
      'from': 20190630,
      'to': 20191030,
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify([
      {
        'season': '2019verano',
        'seed': 'frijol',
        'planting_date': 20190600,
        'harvest_date': 20190630,
        'progress': 0
      }, {
        'season': '2019otoño',
        'seed': 'frijol',
        'planting_date': 20191000,
        'harvest_date': 20191030,
        'progress': 0
      }
    ])) == 0);
  });
}

function runTests(admin_token) {
  return new Promise(async function (resolve, reject) {
    await addSiembras(admin_token);
    await getSiembrasBySeason_test(admin_token);
    await getSiembrasByPlantingDate_test(admin_token);
    await getSiembrasByHarvestDate_test(admin_token);
    resolve(0);
  });
}

module.exports = {
  runTests: runTests
}