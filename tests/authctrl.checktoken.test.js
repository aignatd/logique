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
// Import necessary libraries
const authctrl_1 = require("../controllers/authctrl");
const authclass_1 = __importDefault(require("../classes/authclass"));
const mock_req_res_1 = require("mock-req-res");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Mock authclass methods
jest.mock('../classes/authclass');
authclass_1.default.mockImplementation(() => {
    return {
        checkToken: jest.fn().mockResolvedValue({ status: true, result: 'valid' }),
    };
});
jest.mock('../classes/authclass');
authclass_1.default.mockImplementation(() => {
    return {
        checkToken: jest.fn().mockRejectedValue(new Error('JsonWebTokenError')),
    };
});
/**
 * Middleware function to verify and refresh JWT tokens.
 *
 * @remarks
 * This function is designed to be used as middleware in an Express.js application.
 * It checks if a JWT token is provided in the request headers and verifies its validity.
 * If the token is valid, it calls the next middleware function.
 * If the token is expired, it refreshes the token and calls the next middleware function.
 * If no token is provided or the token is malformed, it sends an appropriate response.
 *
 * @param req - The Express.js request object.
 * @param res - The Express.js response object.
 * @param next - The next middleware function in the Express.js middleware chain.
 *
 * @returns {Promise<void>} - A Promise that resolves when the token verification and next middleware function call are complete.
 */
test('checktoken should support token refresh functionality', () => __awaiter(void 0, void 0, void 0, function* () {
    // Create mock request and response objects
    const req = (0, mock_req_res_1.mockRequest)({
        headers: {
            authorization: 'Bearer <valid_token>',
        },
    });
    const res = (0, mock_req_res_1.mockResponse)();
    // Call checktoken function
    yield (0, authctrl_1.checktoken)(req, res, () => { });
    // Verify response status and body
    expect(res.statusCode).toBe(200);
    expect(res.json({
        code: 0,
        msg: 'Token verified successfully',
    }));
    // Verify authclass methods were called
    expect(authclass_1.default.prototype.checkToken).toHaveBeenCalledTimes(1);
}));
/**
 * This test case verifies the behavior of the `checktoken` function when a token expires.
 *
 * @remarks
 * The test case creates a mock request object with an expired JWT token in the headers.
 * It then simulates the passage of time to expire the token.
 * The `checktoken` function is called with the mock request, response, and next function.
 * The test case asserts that the response status is 401, the response body contains the expected error message,
 * and the next function is not called.
 *
 * @param req - The mock request object containing the expired JWT token.
 * @param res - The mock response object to be used for testing.
 * @param next - The mock next function to be used for testing.
 *
 * @returns {Promise<void>} - A Promise that resolves when the test case is complete.
 */
describe('checktoken function', () => {
    it('should handle token expiration gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = (0, mock_req_res_1.mockRequest)({
            headers: {
                authorization: jsonwebtoken_1.default.sign({ username: 'testUser' }, 'secretKey', { expiresIn: '1s' })
            }
        });
        const res = (0, mock_req_res_1.mockResponse)();
        const next = jest.fn();
        jest.useFakeTimers();
        jest.setSystemTime(new Date(Date.now() + 1000)); // Simulate token expiration
        yield (0, authctrl_1.checktoken)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            code: 4001,
            msg: 'Token has expired'
        });
        expect(next).not.toHaveBeenCalled();
    }));
});
/**
 * This function is a middleware for verifying and refreshing JWT tokens in an Express.js application.
 * It checks if a JWT token is provided in the request headers and verifies its validity.
 * If the token is valid, it calls the next middleware function.
 * If the token is expired, it refreshes the token and calls the next middleware function.
 * If no token is provided or the token is malformed, it sends an appropriate response.
 *
 * @param req - The Express.js request object.
 * @param res - The Express.js response object.
 * @param next - The next middleware function in the Express.js middleware chain.
 *
 * @returns {Promise<void>} - A Promise that resolves when the token verification and next middleware function call are complete.
 */
test('checktoken should return 403 when no token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
    // Create mock request and response objects
    const req = (0, mock_req_res_1.mockRequest)();
    const res = (0, mock_req_res_1.mockResponse)();
    // Call checktoken function
    yield (0, authctrl_1.checktoken)(req, res, () => { });
    // Verify response status and body
    expect(res.statusCode).toBe(403);
    expect(res.json({
        code: 4004,
        msg: 'Token not found',
    }));
    // Verify authclass methods were called
    expect(authclass_1.default.prototype.checkToken).toHaveBeenCalledTimes(1);
}));
/**
 * Middleware function to verify and refresh JWT tokens.
 *
 * This function is designed to be used as middleware in an Express.js application.
 * It checks if a JWT token is provided in the request headers and verifies its validity.
 * If the token is valid, it calls the next middleware function.
 * If the token is expired, it refreshes the token and calls the next middleware function.
 * If no token is provided or the token is malformed, it sends an appropriate response.
 *
 * @param req - The Express.js request object.
 * @param res - The Express.js response object.
 * @param next - The next middleware function in the Express.js middleware chain.
 *
 * @returns {Promise<void>} - A Promise that resolves when the token verification and next middleware function call are complete.
 */
test('checktoken should return 400 when token is malformed', () => __awaiter(void 0, void 0, void 0, function* () {
    // Create mock request and response objects
    const req = (0, mock_req_res_1.mockRequest)({
        headers: {
            authorization: 'Bearer <malformed_token>',
        },
    });
    const res = (0, mock_req_res_1.mockResponse)();
    // Call checktoken function
    yield (0, authctrl_1.checktoken)(req, res, () => { });
    // Verify response status and body
    expect(res.statusCode).toBe(403);
    expect(res.json({
        code: 4002,
        msg: 'The token is not valid',
    }));
    // Verify authclass methods were called
    expect(authclass_1.default.prototype.checkToken).toHaveBeenCalledTimes(1);
}));
