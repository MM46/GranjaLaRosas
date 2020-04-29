const request = require('request-promise');
const assert = require('assert');

function addExpense_test(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/addExpense',
    body: {
      'date': 20200420,
      'description': '50kg Semillas de frijol',
      'cost': 1000
    }
  }, function (err, res, body) {
    assert(body == 20200420);
  });
}

function updateExpense_date_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/updateExpense',
    body: {
      'old': {
        'date': 20200420,
        'description': '50kg Semillas de frijol',
        'cost': 1000
      },
      'new': {
        'date': 20200421,
        'description': '50kg Semillas de frijol',
        'cost': 1000
      }
    }
  }, function (err, res, body) {
    assert(body == 20200421);
  });
}

function updateExpense_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/updateExpense',
    body: {
      'old': {
        'date': 20200421,
        'description': '50kg Semillas de frijol',
        'cost': 1000
      },
      'new': {
        'date': 20200421,
        'description': '100kg Semillas de frijol',
        'cost': 1001
      }
    }
  }, function (err, res, body) {
    assert(body == 20200421);
  });
}

function getExpenses_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getExpenses',
    body: {}
  }, function (err, res, body) {
    assert(body[20200421] != null);
  });
}

function removeExpense_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/removeExpense',
    body: {
      'date': 20200421,
      'description': '100kg Semillas de frijol',
      'cost': 1001
    }
  }, function (err, res, body) {
    assert(body == 20200421);
  });
}

function runTests(admin_token) {
  return new Promise(async function (resolve, reject) {
    await addExpense_test(admin_token);
    await updateExpense_date_test(admin_token);
    await updateExpense_test(admin_token);
    await getExpenses_test(admin_token);
    removeExpense_test(admin_token);
    resolve(0);
  });
}

module.exports = {
  runTests: runTests
}