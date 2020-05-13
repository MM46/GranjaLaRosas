const request = require('request-promise');
const assert = require('assert');

function registerEmployee(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/registerEmployee',
    body: {
      'username': 'narianmr',
      'name': 'Narian',
      'lastname1': 'Muñoz',
      'lastname2': 'Rosas',
      'birth_date': '19970905',
      'hire_date': '20200305',
      'salary': 1500
    }
  }, function (_, _, _) { });
}

function addPayCycle(token, body) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/newPayCycle',
    body: body
  }, function (_, _, _) { });
}

async function addPayCycles(token) {
  await addPayCycle(token, {
    'period_start': 20200601,
    'period_end': 20200615,
    'pay_date': 20200615
  });
  await addPayCycle(token, {
    'period_start': 20200616,
    'period_end': 20200630,
    'pay_date': 20200630
  });
  await addPayCycle(token, {
    'period_start': 20200701,
    'period_end': 20200715,
    'pay_date': 20200715
  });
}

function getAllEmployees_test(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getAllEmployees',
    body: {}
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify([
      {
        'birth_date': '19970905',
        'active': true,
        'hire_date': '20200305',
        'salary': [
          {
            'date': '20200305',
            'amount': 1000
          }
        ],
        'name': 'MAURICIO',
        'lastname2': 'MANJARREZ',
        'lastname1': 'GUADIANA',
        'username': 'mauriciogm97'
      }, {
        'birth_date': '19970905',
        'active': true,
        'hire_date': '20200305',
        'salary': [
          {
            'date': '20200305',
            'amount': 1500
          }
        ],
        'name': 'NARIAN',
        'lastname2': 'ROSAS',
        'lastname1': 'MUÑOZ',
        'username': 'narianmr'
      }
    ])) == 0);
  });
}

function getEmployeesByNameInitial_test(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getEmployeesByNameInitial',
    body: {
      'initial': 'm'
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify([
      {
        'birth_date': '19970905',
        'active': true,
        'hire_date': '20200305',
        'salary': [
          {
            'date': '20200305',
            'amount': 1000
          }
        ],
        'name': 'MAURICIO',
        'lastname2': 'MANJARREZ',
        'lastname1': 'GUADIANA',
        'username': 'mauriciogm97'
      }
    ])) == 0);
  });
}

function getEmployeesByLastNameInitial_test(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getEmployeesByLastNameInitial',
    body: {
      'initial': 'm'
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify([
      {
        'birth_date': '19970905',
        'active': true,
        'hire_date': '20200305',
        'salary': [
          {
            'date': '20200305',
            'amount': 1500
          }
        ],
        'name': 'NARIAN',
        'lastname2': 'ROSAS',
        'lastname1': 'MUÑOZ',
        'username': 'narianmr'
      }
    ])) == 0);
  });
}

function getEmployeesByName_test(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getEmployeesByName',
    body: {
      'name': 'Narian'
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify([
      {
        'birth_date': '19970905',
        'active': true,
        'hire_date': '20200305',
        'salary': [
          {
            'date': '20200305',
            'amount': 1500
          }
        ],
        'name': 'NARIAN',
        'lastname2': 'ROSAS',
        'lastname1': 'MUÑOZ',
        'username': 'narianmr'
      }
    ])) == 0);
  });
}

function getEmployeesLastByName_test(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getEmployeesByLastName',
    body: {
      'lastname': 'Guadiana'
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify([
      {
        'birth_date': '19970905',
        'active': true,
        'hire_date': '20200305',
        'salary': [
          {
            'date': '20200305',
            'amount': 1000
          }
        ],
        'name': 'MAURICIO',
        'lastname2': 'MANJARREZ',
        'lastname1': 'GUADIANA',
        'username': 'mauriciogm97'
      }
    ])) == 0);
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
    assert(JSON.stringify(body).localeCompare(JSON.stringify({
      'birth_date': '19970905',
      'active': true,
      'hire_date': '20200305',
      'salary': [
        {
          'date': '20200305',
          'amount': 1000
        }
      ],
      'name': 'MAURICIO',
      'lastname2': 'MANJARREZ',
      'lastname1': 'GUADIANA',
      'username': 'mauriciogm97'
    })) == 0);
  });
}

function getAllPayCycles(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getAllPayCycles',
    body: {}
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify([
      {
        'pay_date': 20200615,
        'period_end': 20200615,
        'period_start': 20200601,
        'employees': [
          {
            'absences': [],
            'amount': 1000,
            'deductions': 0,
            'net_pay': 1000,
            'name': 'MAURICIO GUADIANA',
            'username': 'mauriciogm97'
          }, {
            'absences': [],
            'amount': 1500,
            'deductions': 0,
            'net_pay': 1500,
            'name': 'NARIAN MUÑOZ',
            'username': 'narianmr'
          }
        ],
        'paid': 2500
      }, {
        'pay_date': 20200630,
        'period_end': 20200630,
        'period_start': 20200616,
        'employees': [
          {
            'absences': [],
            'amount': 1000,
            'deductions': 0,
            'net_pay': 1000,
            'name': 'MAURICIO GUADIANA',
            'username': 'mauriciogm97'
          }, {
            'absences': [],
            'amount': 1500,
            'deductions': 0,
            'net_pay': 1500,
            'name': 'NARIAN MUÑOZ',
            'username': 'narianmr'
          }
        ],
        'paid': 2500
      }, {
        'pay_date': 20200715,
        'period_end': 20200715,
        'period_start': 20200701,
        'employees': [
          {
            'absences': [],
            'amount': 1000,
            'deductions': 0,
            'net_pay': 1000,
            'name': 'MAURICIO GUADIANA',
            'username': 'mauriciogm97'
          }, {
            'absences': [],
            'amount': 1500,
            'deductions': 0,
            'net_pay': 1500,
            'name': 'NARIAN MUÑOZ',
            'username': 'narianmr'
          }
        ],
        'paid': 2500
      }
    ])) == 0);
  });
}

function getPayCyclesByDateRange(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getPayCyclesByDateRange',
    body: {
      'from': 20200614,
      'to': 20200616
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify([
      {
        'pay_date': 20200615,
        'period_end': 20200615,
        'period_start': 20200601,
        'employees': [
          {
            'absences': [],
            'amount': 1000,
            'deductions': 0,
            'net_pay': 1000,
            'name': 'MAURICIO GUADIANA',
            'username': 'mauriciogm97'
          }, {
            'absences': [],
            'amount': 1500,
            'deductions': 0,
            'net_pay': 1500,
            'name': 'NARIAN MUÑOZ',
            'username': 'narianmr'
          }
        ],
        'paid': 2500
      }
    ])) == 0);
  });
}

function getMyFullPayHistory(token) {
  return request({
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getMyFullPayHistory',
    body: {}
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify([
      {
        'period_start': 20200601,
        'period_end': 20200615,
        'pay_date': 20200615,
        'amount': 1000,
        'deductions': 0,
        'net_pay': 1000,
        'absences': []
      }, {
        'period_start': 20200616,
        'period_end': 20200630,
        'pay_date': 20200630,
        'amount': 1000,
        'deductions': 0,
        'net_pay': 1000,
        'absences': []
      }, {
        'period_start': 20200701,
        'period_end': 20200715,
        'pay_date': 20200715,
        'amount': 1000,
        'deductions': 0,
        'net_pay': 1000,
        'absences': []
      }
    ])) == 0);
  });
}

function getMyPayHistoryByDateRange(token) {
  return request({
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    uri: 'http://localhost:5000/getMyPayHistoryByDateRange',
    body: {
      'from': 20200614,
      'to': 20200616
    }
  }, function (err, res, body) {
    assert(JSON.stringify(body).localeCompare(JSON.stringify([
      {
        'period_start': 20200601,
        'period_end': 20200615,
        'pay_date': 20200615,
        'amount': 1000,
        'deductions': 0,
        'net_pay': 1000,
        'absences': []
      }
    ])) == 0);
  });
}

function runTests(admin_token, user_token) {
  return new Promise(async function (resolve, reject) {
    await registerEmployee(admin_token);
    await addPayCycles(admin_token);
    await getAllEmployees_test(admin_token);
    await getEmployeesByNameInitial_test(admin_token);
    await getEmployeesByLastNameInitial_test(admin_token);
    await getEmployeesByName_test(admin_token);
    await getEmployeesLastByName_test(admin_token);
    await getMyEmployee_test(user_token);
    await getAllPayCycles(admin_token);
    await getPayCyclesByDateRange(admin_token);
    await getMyFullPayHistory(user_token);
    await getMyPayHistoryByDateRange(user_token);
    resolve(0);
  });
}

module.exports = {
  runTests: runTests
}