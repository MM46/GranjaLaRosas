const request = require('request-promise');
const assert = require('assert');

function addSiembra_test(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/addSiembra',
    body: {
      'season': '2020primavera',
      'seed': 'frijol',
      'planting_date': 20200420,
      'harvest_date': 20200503,
      'progress': 0,
    }
  }, function (err, res, body) {
    assert(body == 20200420);
  });
}

function updateSiembra_season_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/updateSiembra',
    body: {
      'old': {
        'season': '2020primavera',
        'seed': 'frijol',
        'planting_date': 20200420,
        'harvest_date': 20200503,
        'progress': 0,
      },
      'new': {
        'season': '2020verano',
        'seed': 'frijol',
        'planting_date': 20200420,
        'harvest_date': 20200503,
        'progress': 0,
      }
    }
  }, function (err, res, body) {
    assert(body == 20200420);
  });
}

function updateSiembra_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/updateSiembra',
    body: {
      'old': {
        'season': '2020verano',
        'seed': 'frijol',
        'planting_date': 20200420,
        'harvest_date': 20200503,
        'progress': 0,
      },
      'new': {
        'season': '2020verano',
        'seed': 'frijol',
        'planting_date': 20200420,
        'harvest_date': 20200503,
        'progress': 20,
      }
    }
  }, function (err, res, body) {
    assert(body == 20200420);
  });
}

function getSiembras_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getSiembras',
    body: {}
  }, function (err, res, body) {
    assert(body[20200420] != null);
  });
}

function removeSiembra_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/removeSiembra',
    body: {
      'season': '2020primavera',
      'seed': 'frijol',
      'planting_date': 20200420,
      'harvest_date': 20200503,
      'progress': 20,
    }
  }, function (err, res, body) {
    assert(body == 20200420);
  });
}

function runTests(admin_token) {
  return new Promise(async function (resolve, reject) {
    await addSiembra_test(admin_token);
    await updateSiembra_season_test(admin_token);
    await updateSiembra_test(admin_token);
    await getSiembras_test(admin_token);
    removeSiembra_test(admin_token);
    resolve(0);
  });
}

module.exports = {
  runTests: runTests
}