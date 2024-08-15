// Import necessary libraries
import { checktoken } from '../controllers/authctrl';
import authclass from '../classes/authclass';
import { mockRequest, mockResponse } from 'mock-req-res';
import jwt from 'jsonwebtoken';

// Mock authclass methods
jest.mock('../classes/authclass');
(authclass as jest.Mock).mockImplementation(() => {
  return {
    checkToken: jest.fn().mockResolvedValue({ status: true, result: 'valid' }),
  };
});

jest.mock('../classes/authclass');
(authclass as jest.Mock).mockImplementation(() => {
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
test('checktoken should support token refresh functionality', async () => {
  // Create mock request and response objects
  const req = mockRequest({
    headers: {
      authorization: 'Bearer <valid_token>',
    },
  });
  const res = mockResponse();

  // Call checktoken function
  await checktoken(req, res, () => {});

  // Verify response status and body
  expect(res.statusCode).toBe(200);
  expect(res.json({
    code: 0,
    msg: 'Token verified successfully',
  }));

  // Verify authclass methods were called
  expect(authclass.prototype.checkToken).toHaveBeenCalledTimes(1);
});

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
  it('should handle token expiration gracefully', async () => {
      const req = mockRequest({
          headers: {
              authorization: jwt.sign({ username: 'testUser' }, 'secretKey', { expiresIn: '1s' })
          }
      });
      const res = mockResponse();
      const next = jest.fn();

      jest.useFakeTimers();
      jest.setSystemTime(new Date(Date.now() + 1000)); // Simulate token expiration

      await checktoken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
          code: 4001,
          msg: 'Token has expired'
      });
      expect(next).not.toHaveBeenCalled();
  });
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
test('checktoken should return 403 when no token is provided', async () => {
  // Create mock request and response objects
  const req = mockRequest();
  const res = mockResponse();

  // Call checktoken function
  await checktoken(req, res, () => {});

  // Verify response status and body
  expect(res.statusCode).toBe(403);
  expect(res.json({
    code: 4004,
    msg: 'Token not found',
  }));

  // Verify authclass methods were called
  expect(authclass.prototype.checkToken).toHaveBeenCalledTimes(1);
});

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
test('checktoken should return 400 when token is malformed', async () => {
  // Create mock request and response objects
  const req = mockRequest({
    headers: {
      authorization: 'Bearer <malformed_token>',
    },
  });
  const res = mockResponse();

  // Call checktoken function
  await checktoken(req, res, () => {});

  // Verify response status and body
  expect(res.statusCode).toBe(403);
  expect(res.json({
    code: 4002,
    msg: 'The token is not valid',
  }));

  // Verify authclass methods were called
  expect(authclass.prototype.checkToken).toHaveBeenCalledTimes(1);
});