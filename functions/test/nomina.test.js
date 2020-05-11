const request = require('request-promise');
const assert = require('assert');

function updateSalary_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/updateSalary',
    body: {
      'username': 'mauriciogm97',
      'date': 20200401,
      'salary': 1500
    }
  }, function (err, res, body) {
    assert(body == 1500);
  });
}

function terminateEmployee_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/terminateEmployee',
    body: {
      'username': 'mauriciogm97'
    }
  }, function (err, res, body) {
    assert(body == 'mauriciogm97');
  });
}

function rehireEmployee_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/rehireEmployee',
    body: {
      'username': 'mauriciogm97'
    }
  }, function (err, res, body) {
    assert(body == 'mauriciogm97');
  });
}

function newPayCycle_test(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/newPayCycle',
    body: {
      'period_start': 20200401,
      'period_end': 20200408,
      'pay_date': 20200408
    }
  }, function (err, res, body) {
    assert(body == 20200408);
  });
}

function resetPayCycle_test(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/resetPayCycle',
    body: {
      'period_start': 20200401,
      'period_end': 20200408,
      'pay_date': 20200408
    }
  }, function (err, res, body) {
    assert(body == 20200408);
  });
}

function registerAbsence_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/registerAbsence',
    body: {
      'period_end': 20200408,
      'username': 'mauriciogm97',
      'absence_date': 20200405
    }
  }, function (err, res, body) {
    assert(body == 20200405);
  });
}

function deleteAbsence_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/deleteAbsence',
    body: {
      'period_end': 20200408,
      'username': 'mauriciogm97',
      'absence_date': 20200405
    }
  }, function (err, res, body) {
    assert(body == 20200405);
  });
}

function deductSalary_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/deductSalary',
    body: {
      'period_end': 20200408,
      'username': 'mauriciogm97',
      'deductions': 500
    }
  }, function (err, res, body) {
    assert(body == 1000);
  });
}

function getEmployees_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getEmployees',
    body: {}
  }, function (err, res, body) {
    assert(body['mauriciogm97'] != null);
  });
}

function getPayCycles_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getPayCycles',
    body: {}
  }, function (err, res, body) {
    assert(body['20200408'] != null);
  });
}

function getMyEmployee_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getMyEmployee',
    body: {}
  }, function (err, res, body) {
    assert(body.username == 'mauriciogm97');
  });
}

function getMyPayHistory_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getMyPayHistory',
    body: {}
  }, function (err, res, body) {
    assert(body['20200408'] != null);
  });
}

function runTests(admin_token, user_token) {
  return new Promise(async function (resolve, reject) {
    await updateSalary_test(admin_token);
    await terminateEmployee_test(admin_token);
    await rehireEmployee_test(admin_token);
    await newPayCycle_test(admin_token);
    await resetPayCycle_test(admin_token);
    await registerAbsence_test(admin_token);
    await deleteAbsence_test(admin_token);
    await deductSalary_test(admin_token);
    // await getEmployees_test(admin_token);
    // await getPayCycles_test(admin_token);
    // await getMyPayHistory_test(user_token);
    // await getMyEmployee_test(user_token);
    resolve(0);
  });
}

module.exports = {
  runTests: runTests
}