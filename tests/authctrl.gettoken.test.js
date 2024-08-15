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
// Import required libraries and modules
const { gettoken } = require('../controllers/authctrl');
const mock_req_res_1 = require("mock-req-res");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Mock the JWT token with an expired date
const expiredToken = jsonwebtoken_1.default.sign({ username: 'testUser' }, 'secretKey', { expiresIn: '0s' });
/**
 * This unit test verifies the behavior of the `gettoken` function when the username and password are missing.
 * It creates mock request and response objects, calls the `gettoken` function with these objects, and then asserts the status code and response body.
 *
 * @param {import('express').Request} req - The mock request object.
 * @param {import('express').Response} res - The mock response object.
 *
 * @returns {Promise<void>} - A promise that resolves when the test is complete.
 */
test('Should return a 4000 error when the username and password are both incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
    // Create a mock request object with incorrect username and password
    const req = (0, mock_req_res_1.mockRequest)({ body: { username: 'wrongUser', password: 'wrongPassword' } });
    // Create a mock response object
    const res = (0, mock_req_res_1.mockResponse)();
    // Call the gettoken function with the mock request and response objects
    yield gettoken(req, res);
    // Assert the status code of the response
    expect(res.statusCode).toBe(401);
    // Assert the response body
    expect(res.json({
        code: 4000,
        msg: 'You are not authorized'
    }));
}));
/**
 * This function handles the authentication process and generates a JWT token for a user.
 * It checks the provided username and password against the database and returns a token if successful.
 * If the username or password is incorrect, or if the token is expired or invalid, appropriate error messages are returned.
 *
 * @param {import('express').Request} req - The HTTP request object containing the username and password in the request body.
 * @param {import('express').Response} res - The HTTP response object to be sent back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the authentication process is complete.
 */
test('Should return a 200 status when the username and password are correct', () => __awaiter(void 0, void 0, void 0, function* () {
    // Create a mock request object with valid username and password
    const req = (0, mock_req_res_1.mockRequest)({ body: { username: 'testUser', password: 'testPassword' } });
    // Create a mock response object
    const res = (0, mock_req_res_1.mockResponse)();
    // Call the gettoken function with the mock request and response objects
    yield gettoken(req, res);
    // Assert the status code of the response
    expect(res.statusCode).toBe(200);
    // Assert the response body
    expect(res.json({
        code: 0,
        msg: 'Token generated successfully',
        data: expect.objectContaining({
            tokenExpiry: expect.any(String),
            tokenData: expect.any(String),
            tokenType: 'bearer'
        })
    }));
}));
/**
 * This unit test verifies the behavior of the `gettoken` function when the token is expired.
 * It creates a mock request object with an expired token, calls the `gettoken` function with this object, and then asserts the status code and response body.
 *
 * @param {import('express').Request} req - The mock request object.
 * @param {import('express').Response} res - The mock response object.
 *
 * @returns {Promise<void>} - A promise that resolves when the test is complete.
 */
test('Should return a 401 error when the token is expired', () => __awaiter(void 0, void 0, void 0, function* () {
    // Create a mock request object with an expired token
    const req = (0, mock_req_res_1.mockRequest)({ headers: { authorization: `Bearer ${expiredToken}` } });
    // Create a mock response object
    const res = (0, mock_req_res_1.mockResponse)();
    // Call the gettoken function with the mock request and response objects
    yield gettoken(req, res);
    // Assert the status code of the response
    expect(res.statusCode).toBe(401);
    // Assert the response body
    expect(res.json({
        code: 4001,
        msg: 'Token has expired'
    }));
}));
/**
 * This unit test verifies the behavior of the `gettoken` function when the token is invalid.
 * It creates a mock request object with an invalid token, calls the `gettoken` function with this object, and then asserts the status code and response body.
 *
 * @param {import('express').Request} req - The mock request object.
 * The request object contains the headers with the authorization token.
 *
 * @param {import('express').Response} res - The mock response object.
 * The response object is used to send back the HTTP response to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the test is complete.
 * The function does not return any value.
 */
test('Should return a 401 error when the token is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
    // Create a mock request object with an invalid token
    const req = (0, mock_req_res_1.mockRequest)({ headers: { authorization: 'Bearer invalidToken' } });
    // Create a mock response object
    const res = (0, mock_req_res_1.mockResponse)();
    // Call the gettoken function with the mock request and response objects
    yield gettoken(req, res);
    // Assert the status code of the response
    expect(res.statusCode).toBe(403);
    // Assert the response body
    expect(res.json({
        code: 4002,
        msg: 'The token is not valid'
    }));
}));
/**
 * This unit test verifies the behavior of the `gettoken` function when the token is not provided in the request authorization header.
 * It creates a mock request object without an authorization header, calls the `gettoken` function with this object, and then asserts the status code and response body.
 *
 * @param {import('express').Request} req - The mock request object.
 * @param {import('express').Response} res - The mock response object.
 *
 * @returns {Promise<void>} - A promise that resolves when the test is complete.
 */
test('Should return a 403 error when the token is not provided in the request authorization header', () => __awaiter(void 0, void 0, void 0, function* () {
    // Create a mock request object without an authorization header
    const req = (0, mock_req_res_1.mockRequest)({ body: { username: 'testUser', password: 'testPassword' } });
    // Create a mock response object
    const res = (0, mock_req_res_1.mockResponse)();
    // Call the gettoken function with the mock request and response objects
    yield gettoken(req, res);
    // Assert the status code of the response
    expect(res.statusCode).toBe(403);
    // Assert the response body
    expect(res.json({
        code: 4004,
        msg: 'Token not found'
    }));
}));
