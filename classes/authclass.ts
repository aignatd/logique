import { v4 as uuidv4 } from 'uuid';
import jwt, { Secret } from 'jsonwebtoken';
import moment from 'moment-timezone';

import { Request } from 'express';

export default class authdata {
  private header: any;
  private body: any;

	constructor(req: Request) {
		this.header = req.headers;
		this.body = req.body;
	}

	public async checkRequest(): Promise<any> {
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

  public async createToken(username: string, password: string) {
    const expTime: any = process.env.expTime;
    const expUnit: any = process.env.expUnit;

    const currdatetime = moment.utc().format("YYYY-MM-DDTHH:mm:ss");
    const lastdatetime = moment.utc().add(expTime, expUnit).format("YYYY-MM-DDTHH:mm:ss") + 'Z';

    let dataJWT: any =
    {
      "clientID": username ? username : '',
      "clientSecret": password ? password : '',
      "created": currdatetime ? currdatetime : '',
      "expired": lastdatetime ? lastdatetime : '',
      "scope": process.env.scope,
      "tokenRSN": uuidv4() ? uuidv4() : ''
    };

    console.log('Data to process ->', dataJWT);

    var Options: any =
    {
      "algorithm": process.env.algorithm,
      "jwtid": process.env.jwtid,
      "noTimestamp": false,
      "expiresIn": `${process.env.expTime}${process.env.expUnit}`
    };

    console.log('Data option ->', Options);

    console.log('---------- Create Token Result ----------');

    const keys: any = process.env.jwtkey;
    const jwtkey: Secret = keys;
    const token = await jwt.sign(dataJWT, jwtkey, Options);
    console.log("Token ->", token);
    return { token, lastdatetime };
  }

	public async checkToken(): Promise<any> {
    const header = this.header.authorization || '';
    const token = header.split(/\s+/).pop();

    console.log('Token data ->', token);

    try {
      const keys: any = process.env.jwtkey;
      const jwtkey: Secret = keys;
      const decoded = await jwt.verify(token, jwtkey);
      return { status: true, result: decoded };
    }
    catch (err: any) {
      return { status: false, result: err.name };
    }
	}
}
