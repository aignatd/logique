"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbCon = void 0;
const sequelize_1 = require("sequelize");
const dbConnection = (addOptions = {}) => {
    const dialect = process.env.DB_DIALECT;
    const name = process.env.DB_NAME;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASS;
    const host = process.env.DB_HOST;
    let options = Object.assign({ host, dialect }, addOptions);
    return new sequelize_1.Sequelize(name, user, password, options);
};
exports.dbCon = dbConnection({ timezone: "+07:00" });
