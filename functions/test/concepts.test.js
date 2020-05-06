const request = require('request-promise');
const assert = require('assert');

function addConcept_test(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/addConcept',
    body: {
      'date': 20200420,
      'description': '50kg Semillas de frijol',
      'cost': 1000
    }
  }, function (err, res, body) {
    assert(body == 20200420);
  });
}

function updateConcept_date_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/updateConcept',
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

function updateConcept_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/updateConcept',
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

function getConcepts_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getConcepts',
    body: {}
  }, function (err, res, body) {
    assert(body[20200421] != null);
  });
}

function removeConcept_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/removeConcept',
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
    await addConcept_test(admin_token);
    await updateConcept_date_test(admin_token);
    await updateConcept_test(admin_token);
    await getConcepts_test(admin_token);
    removeConcept_test(admin_token);
    resolve(0);
  });
}

module.exports = {
  runTests: runTests
}