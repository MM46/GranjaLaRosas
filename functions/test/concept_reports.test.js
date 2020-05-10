const request = require('request-promise');
const assert = require('assert');

function addConcept(token, body) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/addConcept',
    body: body
  }, function (_, _, body) { });
}

async function addConcepts(token) {
  await addConcept(token, {
    'date': 20200501,
    'description': 'comprar semilla frijol',
    'cost': 1000,
    'earning': false
  });
  await addConcept(token, {
    'date': 20200502,
    'description': 'comprar semilla chicharo',
    'cost': 2000,
    'earning': false
  });
  await addConcept(token, {
    'date': 20200503,
    'description': 'venta de frijol',
    'cost': 3000,
    'earning': true
  })
  return addConcept(token, {
    'date': 20200504,
    'description': 'venta de chicharo',
    'cost': 4000,
    'earning': true
  })
}

function getConceptsReport_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getConceptsReport',
    body: {
      'from': 20200502,
      'to': 20200503
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify({
      'concepts': [
        {
          'date': 20200502,
          'description': 'comprar semilla chicharo',
          'cost': 2000,
          'earning': false
        }, {
          'date': 20200503,
          'description': 'venta de frijol',
          'cost': 3000,
          'earning': true
        }
      ],
      'net': 1000,
      'earnings': 3000,
      'expenses': 2000
    })) == 0);
  });
}

function getEarningsReport_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getEarningsReport',
    body: {
      'from': 20200502,
      'to': 20200503
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify({
      'concepts': [
        {
          'date': 20200503,
          'description': 'venta de frijol',
          'cost': 3000,
          'earning': true
        }
      ],
      'net': 3000,
      'earnings': 3000,
      'expenses': 0
    })) == 0);
  });
}

function getExpensesReport_test(token, body, expected_res) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getExpensesReport',
    body: {
      'from': 20200502,
      'to': 20200503
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify({
      'concepts': [
        {
          'date': 20200502,
          'description': 'comprar semilla chicharo',
          'cost': 2000,
          'earning': false
        }
      ],
      'net': -2000,
      'earnings': 0,
      'expenses': 2000
    })) == 0);
  });
}

function runTests(admin_token) {
  return new Promise(async function (resolve, reject) {
    await addConcepts(admin_token);
    await getConceptsReport_test(admin_token);
    await getEarningsReport_test(admin_token);
    await getExpensesReport_test(admin_token);
    resolve(0);
  });
}

module.exports = {
  runTests: runTests
}