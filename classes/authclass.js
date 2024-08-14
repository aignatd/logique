const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

const values = require("../config/jwtcon");

module.exports = class authdata {
	constructor(req) {
		this.header = req.headers;
		this.body = req.body;
	}

	async checkRequest() {
		console.log('Header ->', this.header)
		console.log('Body ->', this.body)

		let username = "";
		let password = "";

		if (this.header.authorization && this.header.authorization.indexOf('Basic ') >= 0 && this.body.grant_type === 'client_credentials') {
			const base64Credentials = this.header.authorization.split(' ')[1];
			const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
			[username, password] = credentials.split(':');
		}

		return { username, password };
	}

  async createToken(username, password) {
    const currdatetime = moment.utc().format("YYYY-MM-DDTHH:mm:ss");
    const lastdatetime = moment.utc().add(values.expTime, values.expUnit).format("YYYY-MM-DDTHH:mm:ss") + 'Z';

    let dataJWT =
    {
      "clientID": username ? username : '',
      "clientSecret": password ? password : '',
      "created": currdatetime ? currdatetime : '',
      "expired": lastdatetime ? lastdatetime : '',
      "scope": values.scope,
      "tokenRSN": uuidv4() ? uuidv4() : ''
    };

    console.log('Data to process ->', dataJWT);

    let Options =
    {
      "algorithm": values.algorithm,
      "jwtid": values.jwtid,
      "noTimestamp": false,
      "expiresIn": `${values.expTime}${values.expUnit}`
    };

    console.log('Data option ->', Options);

    console.log('---------- Create Token Result ----------');

    const token = await jwt.sign(dataJWT, values.jwtkey, Options);
    console.log("Token ->", token);
    return { token, lastdatetime };
  }

	async checkToken() {
    const header = this.header.authorization || '';
    const token = header.split(/\s+/).pop();

    console.log('Token data ->', token);

    try {
      const decoded = await jwt.verify(token, values.jwtkey);
      return { status: true, result: decoded };
    }
    catch (err) {
      return { status: false, result: err.name };
    }
	}
}
