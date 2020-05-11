const { db } = require('../database');

function getEmployees(condition) {
  return new Promise(function (resolve, reject) {
    db.collection('employees').get().then(function (querySnapshot) {
      var employees = [];
      querySnapshot.forEach(function (doc) {
        const employee = doc.data();
        if (condition(employee) && employee.active) {
          employees.push(employee);
        }
      })
      resolve(employees);
    });
  }).catch(function (_) {
    reject('Error al acceder base de datos');
  })
}

const getAllEmployees = function (req, res) {
  getEmployees(function (_) {
    return true;
  }).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

const getEmployeesByNameInitial = function (req, res) {
  const body = req.body;
  getEmployees(function (employee) {
    if (employee.name.substring(0, 1).localeCompare(body.initial.toUpperCase()) == 0) {
      return true;
    } else {
      return false;
    }
  }).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

const getEmployeesByLastNameInitial = function (req, res) {
  const body = req.body;
  getEmployees(function (employee) {
    if (employee.lastname1.substring(0, 1).localeCompare(body.initial.toUpperCase()) == 0) {
      return true;
    } else {
      return false;
    }
  }).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

const getEmployeesByName = function (req, res) {
  const body = req.body;
  getEmployees(function (employee) {
    if (employee.name.localeCompare(body.name.toUpperCase()) == 0) {
      return true;
    } else {
      return false;
    }
  }).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

const getEmployeesByLastName = function (req, res) {
  const body = req.body;
  getEmployees(function (employee) {
    if (employee.lastname1.localeCompare(body.lastname.toUpperCase()) == 0) {
      return true;
    }
    return false;
  }).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

const getMyEmployee = function (req, res) {
  const username = req.user.username;
  db.collection('employees').doc(username).get().then(function (doc) {
    return res.send(doc.data());
  }).catch(function (_) {
    return res.status(500).send('Error al acceder base de datos');
  });
}

function extractEmployees(pay_cycle) {
  const period_end_str = pay_cycle.period_end.toString();
  pay_cycle.employees = [];
  pay_cycle.paid = 0;
  return new Promise(function (resolve, reject) {
    db.collection('pay_cycles').doc(period_end_str).collection('employees')
      .get().then(function (querySnapshot) {
        var index = 1;
        const aux = new Promise(function (resolve, reject) {
          querySnapshot.forEach(function (doc) {
            const employee = doc.data();
            pay_cycle.employees.push(employee);
            pay_cycle.paid = pay_cycle.paid + employee.net_pay;
            if (index == querySnapshot.size) {
              resolve();
            }
            index = index + 1;
          });
        });
        aux.then(function () {
          resolve(pay_cycle);
        });
      }).catch(function (_) {
        reject('Error al acceder base de datos');
      });
  });
}

function getPayCycles(condition) {
  return new Promise(function (resolve, reject) {
    var pay_cycles = [];
    db.collection('pay_cycles').get().then(function (querySnapshot) {
      var index = 1;
      const aux = new Promise(function (resolve, reject) {
        querySnapshot.forEach(function (doc) {
          const pay_cycle = doc.data();
          if (condition(pay_cycle)) {
            // TODO: REFACTOR (index is checked twice)!!!
            extractEmployees(pay_cycle).then(function (populated_pay_cycle) {
              pay_cycles.push(populated_pay_cycle);
              if (index == querySnapshot.size) {
                resolve();
              }
              index = index + 1;
            }).catch(function (err) {
              reject(err);
            })
          } else {
            if (index == querySnapshot.size) {
              resolve();
            }
            index = index + 1;
          }
        });
      });
      aux.then(function () {
        resolve(pay_cycles.sort(function (a, b) {
          return a.period_end - b.period_end;
        }));
      });
    }).catch(function (_) {
      reject('Error al acceder base de datos');
    });
  });
}

const getAllPayCycles = function (req, res) {
  getPayCycles(function (_) {
    return true;
  }).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

const getPayCyclesByDateRange = function (req, res) {
  const body = req.body;
  getPayCycles(function (pay_cycle) {
    if (pay_cycle.period_end >= body.from && pay_cycle.period_end <= body.to) {
      return true;
    }
    return false;
  }).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

function getMyPayHistory(username, condition) {
  return new Promise(function (resolve, reject) {
    var pay_history = [];
    db.collection('pay_cycles').get().then(function (querySnapshot) {
      var index = 1;
      const aux = new Promise(function (resolve, reject) {
        querySnapshot.forEach(function (doc) {
          const pay_cycle = doc.data();
          const period_end_str = pay_cycle.period_end.toString();
          db.collection('pay_cycles').doc(period_end_str)
            .collection('employees').doc(username).get().then(function (doc) {
              const employee = doc.data();
              if (condition(pay_cycle)) {
                pay_history.push({
                  'period_start': pay_cycle.period_start,
                  'period_end': pay_cycle.period_end,
                  'pay_date': pay_cycle.pay_date,
                  'amount': employee.amount,
                  'deductions': employee.deductions,
                  'net_pay': employee.net_pay,
                  'absences': employee.absences
                });
              }
              if (index == querySnapshot.size) {
                resolve();
              }
              index = index + 1;
            }).catch(function (_) {
              reject('Error al acceder a base de datos');
            })
        });
      });
      aux.then(function () {
        resolve(pay_history.sort(function (a, b) {
          return a.period_end - b.period_end;
        }));
      })
    }).catch(function (_) {
      reject('Error al leer los ciclos de pago');
    });
  });
}

const getMyFullPayHistory = function (req, res) {
  const username = req.user.username;
  getMyPayHistory(username, function (_) {
    return true;
  }).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

const getMyPayHistoryByDateRange = function (req, res) {
  const body = req.body;
  const username = req.user.username;
  getMyPayHistory(username, function (pay_cycle) {
    if (pay_cycle.period_end >= body.from && pay_cycle.period_end <= body.to) {
      return true;
    }
    return false;
  }).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(500).send(err);
  });
}

module.exports = {
  getAllEmployees: getAllEmployees,
  getEmployeesByNameInitial: getEmployeesByNameInitial,
  getEmployeesByLastNameInitial: getEmployeesByLastNameInitial,
  getEmployeesByName: getEmployeesByName,
  getEmployeesByLastName: getEmployeesByLastName,
  getMyEmployee: getMyEmployee,
  getAllPayCycles: getAllPayCycles,
  getPayCyclesByDateRange: getPayCyclesByDateRange,
  getMyFullPayHistory: getMyFullPayHistory,
  getMyPayHistoryByDateRange: getMyPayHistoryByDateRange
}