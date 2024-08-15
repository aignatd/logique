"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
class authdata {
    constructor(req) {
        this.header = req.headers;
        this.body = req.body;
    }
    checkRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Header ->', this.header);
            console.log('Body ->', this.body);
            let username = "";
            let password = "";
            if (this.header.authorization && this.header.authorization.indexOf('Basic ') >= 0 && this.body.grant_type === 'client_credentials') {
                const base64Credentials = this.header.authorization.split(' ')[1];
                const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
                [username, password] = credentials.split(':');
            }
            return { username, password };
        });
    }
    createToken(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const expTime = process.env.expTime;
            const expUnit = process.env.expUnit;
            const currdatetime = moment_timezone_1.default.utc().format("YYYY-MM-DDTHH:mm:ss");
            const lastdatetime = moment_timezone_1.default.utc().add(expTime, expUnit).format("YYYY-MM-DDTHH:mm:ss") + 'Z';
            let dataJWT = {
                "clientID": username ? username : '',
                "clientSecret": password ? password : '',
                "created": currdatetime ? currdatetime : '',
                "expired": lastdatetime ? lastdatetime : '',
                "scope": process.env.scope,
                "tokenRSN": (0, uuid_1.v4)() ? (0, uuid_1.v4)() : ''
            };
            console.log('Data to process ->', dataJWT);
            var Options = {
                "algorithm": process.env.algorithm,
                "jwtid": process.env.jwtid,
                "noTimestamp": false,
                "expiresIn": `${process.env.expTime}${process.env.expUnit}`
            };
            console.log('Data option ->', Options);
            console.log('---------- Create Token Result ----------');
            const keys = process.env.jwtkey;
            const jwtkey = keys;
            const token = yield jsonwebtoken_1.default.sign(dataJWT, jwtkey, Options);
            console.log("Token ->", token);
            return { token, lastdatetime };
        });
    }
    checkToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const header = this.header.authorization || '';
            const token = header.split(/\s+/).pop();
            console.log('Token data ->', token);
            try {
                const keys = process.env.jwtkey;
                const jwtkey = keys;
                const decoded = yield jsonwebtoken_1.default.verify(token, jwtkey);
                return { status: true, result: decoded };
            }
            catch (err) {
                return { status: false, result: err.name };
            }
        });
    }
}
exports.default = authdata;
