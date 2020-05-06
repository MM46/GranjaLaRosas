const sessions = require('./sessions.test')
const nomina = require('./nomina.test')
const gastos = require('./concepts.test')
const sembradios = require('./sembradios.test')

async function runTests() {
  await sessions.dummyAdmin();
  const admin_token = await sessions.login('admin', '12345678');
  const user_pass = (await sessions.registerEmployee(admin_token)).pass;
  const user_token = await sessions.login('mauriciogm97', user_pass);

  await sessions.runTests(admin_token, user_token, user_pass);
  await nomina.runTests(admin_token, user_token);
  await gastos.runTests(admin_token);
  await sembradios.runTests(admin_token);

  sessions.logout('admin', admin_token);
  sessions.logout('mauriciogm97', user_token);
}
runTests();