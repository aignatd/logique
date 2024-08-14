const { Sequelize } = require('sequelize');

const dbConnection = (addOptions = {}) => {
  const dialect = process.env.DB_DIALECT;
  const name = process.env.DB_NAME;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;
  const host = process.env.DB_HOST;

  let options = { host, dialect, ...addOptions }
  return new Sequelize(name, user, password, options);
}

exports.dbCon = dbConnection({ timezone: "+07:00" });