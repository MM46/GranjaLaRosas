const request = require('request-promise');
const assert = require('assert');

function addConcept(token, data) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/addConcept',
    body: {
      'date': data.date,
      'description': data.description,
      'cost': data.cost,
      'earning': data.earning
    }
  }, function (_, _, body) { });
}

function getConceptsReport_test(token, body, expected_res) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getConceptsReport',
    body: {
      'from': body.from,
      'to': body.to
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify(expected_res)) == 0);
  });
}

function getEarningsReport_test(token, body, expected_res) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getEarningsReport',
    body: {
      'from': body.from,
      'to': body.to
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify(expected_res)) == 0);
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
      'from': body.from,
      'to': body.to
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify(expected_res)) == 0);
  });
}

function runTests(admin_token) {
  return new Promise(async function (resolve, reject) {
    await addConcept(admin_token, {
      'date': 20200501,
      'description': 'comprar semilla frijol',
      'cost': 1000,
      'earning': false
    });
    await addConcept(admin_token, {
      'date': 20200502,
      'description': 'comprar semilla chicharo',
      'cost': 2000,
      'earning': false
    });
    await addConcept(admin_token, {
      'date': 20200503,
      'description': 'venta de frijol',
      'cost': 3000,
      'earning': true
    });
    await addConcept(admin_token, {
      'date': 20200504,
      'description': 'venta de chicharo',
      'cost': 4000,
      'earning': true
    });
    await getConceptsReport_test(admin_token, {
      'from': 20200502,
      'to': 20200503
    }, {
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
      'total': 1000
    });
    await getEarningsReport_test(admin_token, {
      'from': 20200502,
      'to': 20200503
    }, {
      'concepts': [
        {
          'date': 20200503,
          'description': 'venta de frijol',
          'cost': 3000,
          'earning': true
        }
      ],
      'total': 3000
    });
    await getExpensesReport_test(admin_token, {
      'from': 20200502,
      'to': 20200503
    }, {
      'concepts': [
        {
          'date': 20200502,
          'description': 'comprar semilla chicharo',
          'cost': 2000,
          'earning': false
        }
      ],
      'total': -2000
    });
    resolve(0);
  });
}

module.exports = {
  runTests: runTests
}