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
// Import necessary libraries
const booksctrl_1 = require("../controllers/booksctrl");
const mock_req_res_1 = require("mock-req-res");
const sequelize_1 = require("sequelize");
/**
 * This function handles the GET request for retrieving a book by its ID.
 * It checks if the requested book exists in the database and returns the book data if found.
 * If the book is not found, it returns a 404 status with an appropriate error message.
 *
 * @param req - The Express request object containing the book ID in the request parameters.
 * @param res - The Express response object to send the response back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
describe('GET /books/:id', () => {
    it('should return a 404 status when the requested book ID does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = (0, mock_req_res_1.mockRequest)({ params: { id: 1 } });
        const res = (0, mock_req_res_1.mockResponse)();
        // Mock the Sequelize model findOne method to return null
        jest.spyOn(sequelize_1.Model, 'findOne').mockResolvedValueOnce(null);
        yield (0, booksctrl_1.getbooks)(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.json).toHaveBeenCalledWith({
            code: 1001,
            msg: 'Book data not found',
            data: [],
        });
    }));
});
describe('GET /books/:id', () => {
    it('should return a 200 status when the requested book ID exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = (0, mock_req_res_1.mockRequest)({ params: { id: 1 } });
        const res = (0, mock_req_res_1.mockResponse)();
        // Mock the Sequelize model findOne method to return a book object
        const mockBook = { id: 1, title: 'Test Book', author: 'Test Author' };
        jest.spyOn(sequelize_1.Model, 'findOne').mockResolvedValueOnce(mockBook);
        yield (0, booksctrl_1.getbooks)(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 0,
            msg: 'Book data found',
            data: [mockBook],
        });
    }));
});
