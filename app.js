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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connect_timeout_1 = __importDefault(require("connect-timeout"));
const express_file_routing_1 = require("express-file-routing");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
(0, express_file_routing_1.createRouter)(app, {
    directory: path_1.default.join(__dirname, "routes"),
    additionalMethods: ["custom"]
});
app.use((err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (err) {
        console.log('Error ->', err);
        next(err);
    }
    app.use((0, connect_timeout_1.default)(120000));
    app.use(haltOnTimedout);
    function haltOnTimedout(req, Request, next) {
        if (!req.timedout)
            next();
    }
    ;
    next();
}));
app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log("Server started on port 11011");
});
