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

function login_test(user, pass) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    uri: 'http://localhost:5000/login',
    body: {
      'username': user,
      'pass': pass
    }
  }, function (err, res, body) {
    assert(err == null);
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

function updatePass_test(token, old_pass) {
  return request({
    method: 'PATCH',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/updatePass',
    body: {
      'old_pass': old_pass,
      'new_pass': '12345678'
    }
  }, function (err, res, body) {
    assert(body == 'mauriciogm97');
  });
}

function getMyUser_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getMyUser',
    body: {}
  }, function (err, res, body) {
    assert(body.username == 'mauriciogm97');
  });
}

function logout_test(username, token) {
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
    assert(body.username == username);
  });
}

function runTests(admin_token, user_token, user_pass) {
  return new Promise(async function (resolve, reject) {
    await getUsers_test(admin_token);
    await updatePass_test(user_token, user_pass);
    await getMyUser_test(user_token);
    resolve(0);
  });
}

module.exports = {
  dummyAdmin: dummyAdmin_test,
  login: login_test,
  registerEmployee: registerEmployee_test,
  logout: logout_test,
  runTests: runTests
}
