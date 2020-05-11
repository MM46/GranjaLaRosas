const sessions = require('./sessions.test');

const concept_reports = require('./concept_reports.test');
const siembra_reports = require('./siembra_reports.test');
const nomina_reports = require('./nomina_reports.test');

async function runTests() {
  await sessions.dummyAdmin();
  const admin_token = await sessions.login('admin', '12345678');
  const user_pass = (await sessions.registerEmployee(admin_token)).pass;
  const user_token = await sessions.login('mauriciogm97', user_pass);

  await concept_reports.runTests(admin_token);
  await siembra_reports.runTests(admin_token);
  await nomina_reports.runTests(admin_token, user_token);

  sessions.logout('admin', admin_token);
  sessions.logout('mauriciogm97', user_token);
}
runTests();