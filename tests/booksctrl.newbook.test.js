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
Object.defineProperty(exports, "__esModule", { value: true });
const booksctrl_1 = require("../controllers/booksctrl");
const mock_req_res_1 = require("mock-req-res");
/**
 * This function handles the creation of new books in the system.
 * It expects a request object containing the book details in the request body.
 * The function validates the input data, saves the book to the database, and returns a response with appropriate status codes and messages.
 *
 * @param req - The request object containing the book details.
 * @param res - The response object to be sent back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws Will throw an error if the book details are invalid or if the book cannot be saved.
 */
describe('newbooks function', () => {
    it('should return a 200 status code when a new book is successfully saved', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const req = (0, mock_req_res_1.mockRequest)({ body: { title: 'Test Book', author: 'Test Author', publishedYear: 2022, genres: 'Test Genre' } });
        const res = (0, mock_req_res_1.mockResponse)();
        // Act
        yield (0, booksctrl_1.newbooks)(req, res);
        // Assert
        expect(res.status).toBe(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 0,
            msg: 'New book saved',
        });
    }));
});
/**
 * This function handles the creation of new books in the system.
 * It expects a request object containing the book details in the request body.
 * The function validates the input data, saves the book to the database, and returns a response with appropriate status codes and messages.
 *
 * @param req - The request object containing the book details.
 * @param res - The response object to be sent back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws Will throw an error if the book details are invalid or if the book cannot be saved.
 */
describe('newbooks function', () => {
    it('should return a 400 status code when a new book fails to save', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const req = (0, mock_req_res_1.mockRequest)({ body: {} }); // Empty request body to simulate a failed save
        const res = (0, mock_req_res_1.mockResponse)();
        // Act
        yield (0, booksctrl_1.newbooks)(req, res);
        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            code: 1004,
            msg: 'Book not saved',
        });
    }));
});
/**
 * This function handles the creation of new books in the system.
 * It expects a request object containing the book details in the request body.
 * The function validates the input data, saves the book to the database, and returns a response with appropriate status codes and messages.
 *
 * @param req - The request object containing the book details.
 * @param {import('express').Request} req.body.title - The title of the book.
 * @param {import('express').Request} req.body.author - The author of the book.
 * @param {import('express').Request} req.body.publishedYear - The year the book was published.
 * @param {import('express').Request} req.body.genres - The genres of the book.
 * @param res - The response object to be sent back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws Will throw an error if the book details are invalid or if the book cannot be saved.
 */
describe('newbooks function', () => {
    it('should validate the input data format and reject invalid entries', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const invalidReq = (0, mock_req_res_1.mockRequest)({ body: { title: '', author: 'Test Author', publishedYear: '2022', genres: 'Test Genre' } });
        const validReq = (0, mock_req_res_1.mockRequest)({ body: { title: 'Test Book', author: 'Test Author', publishedYear: 2022, genres: 'Test Genre' } });
        const res = (0, mock_req_res_1.mockResponse)();
        // Act
        yield (0, booksctrl_1.newbooks)(invalidReq, res);
        yield (0, booksctrl_1.newbooks)(validReq, res);
        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 1004,
            msg: 'Book not saved',
        });
        expect(res.json).toHaveBeenCalledWith({
            code: 0,
            msg: 'New book saved',
        });
    }));
});
/**
 * This function handles the creation of new books in the system.
 * It expects a request object containing the book details in the request body.
 * The function validates the input data, saves the book to the database, and returns a response with appropriate status codes and messages.
 *
 * @param req - The request object containing the book details.
 * @param {import('express').Request} req.body.title - The title of the book.
 * @param {import('express').Request} req.body.author - The author of the book.
 * @param {import('express').Request} req.body.publishedYear - The year the book was published.
 * @param {import('express').Request} req.body.genres - The genres of the book.
 * @param res - The response object to be sent back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws Will throw an error if the book details are invalid or if the book cannot be saved.
 */
describe('newbooks function', () => {
    it('should return a meaningful error message when the book title is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const req = (0, mock_req_res_1.mockRequest)({ body: { author: 'Test Author', publishedYear: 2022, genres: 'Test Genre' } });
        const res = (0, mock_req_res_1.mockResponse)();
        // Act
        yield (0, booksctrl_1.newbooks)(req, res);
        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            code: 1004,
            msg: 'Book not saved',
        });
    }));
});
