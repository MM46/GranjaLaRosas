const request = require('request-promise');
const assert = require('assert');

function dummyAdmin_test() {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    uri: 'http://localhost:5000/dummyAdmin',
    body: {}
  }, function (err, res, body) {
    assert(body.username == 'admin');
  });
}

function login_admin_test() {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    uri: 'http://localhost:5000/login',
    body: {
      'username': 'admin',
      'pass': '12345678'
    }
  }, function (err, res, body) {
    assert(err == null);
    return body;
  });
}

function registerEmployee_test(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/registerEmployee',
    body: {
      'username': 'mauriciogm97',
      'name': 'Mauricio',
      'lastname1': 'Guadiana',
      'lastname2': 'Manjarrez',
      'birth_date': '19970905',
      'hire_date': '20200305',
      'salary': 1000
    }
  }, function (err, res, body) {
    assert(body.username == 'mauriciogm97');
  });
}

function resetPass_test(token) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/resetPass',
    body: {
      'username': 'mauriciogm97',
    }
  }, function (err, res, body) {
    assert(body.username == 'mauriciogm97');
    return body.pass;
  });
}

function getUsers_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getUsers',
    body: {}
  }, function (err, res, body) {
    assert(body.admin != null);
  });
}

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

function logout_admin_test(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/logout',
    body: {}
  }, function (err, res, body) {
    assert(body.username == 'admin');
  });
}

async function runTests(tok) {
  await dummyAdmin_test();
  const admin_token = await login_admin_test();
  await registerEmployee_test(admin_token);
  const user_pass = await resetPass_test(admin_token);
  await getUsers_test(admin_token);
  await updateSalary_test(admin_token);
  await terminateEmployee_test(admin_token);
  await rehireEmployee_test(admin_token);
  await newPayCycle_test(admin_token);
  await resetPayCycle_test(admin_token);
  await registerAbsence_test(admin_token);
  await deleteAbsence_test(admin_token);
  await deductSalary_test(admin_token);
  await getEmployees_test(admin_token);
  await getPayCycles_test(admin_token);
  logout_admin_test(admin_token);
}
runTests();

