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
// Import required libraries and modules
const booksctrl_1 = require("../controllers/booksctrl");
const sequelize_1 = require("sequelize");
// Mock Sequelize model findAll method
const findAllMock = jest.fn().mockResolvedValue([
    { id: 1, title: 'Book 1', author: 'Author 1', publishedYear: 2022, genres: 'Genre 1' },
    { id: 2, title: 'Book 2', author: 'Author 2', publishedYear: 2021, genres: 'Genre 2' },
]);
// Mock Sequelize model
const sequelizeMock = {
    models: {
        books: {
            findAll: findAllMock,
        },
    },
};
// Mock req and res objects
const req = {
    query: { search: 'Author 1' },
};
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};
/**
 * This function handles the retrieval of book data based on search criteria.
 * It uses the provided request and response objects to interact with the database and send a response.
 *
 * @param req - The request object containing search criteria.
 * @param res - The response object to send the retrieved data.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
// Test case: Should return an empty list when no books are available
test('Should return an empty list when no books are available', () => __awaiter(void 0, void 0, void 0, function* () {
    // Call the listbooks function
    yield (0, booksctrl_1.listbooks)(req, res);
    // Assert the response status and data
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
        code: 1000,
        msg: 'Books data not found',
        data: [],
    });
    // Assert the Sequelize model method calls
    expect(sequelizeMock.models.books.findAll).toHaveBeenCalledTimes(1);
    expect(sequelizeMock.models.books.findAll).toHaveBeenCalledWith({
        attributes: { exclude: ['created_at', 'updated_at'] },
    });
}));
/**
 * This function handles the retrieval of book data based on search criteria.
 * It uses the provided request and response objects to interact with the database and send a response.
 *
 * @param req - The request object containing search criteria.
 * @param res - The response object to send the retrieved data.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
test('Should return a list of books when multiple search terms match', () => __awaiter(void 0, void 0, void 0, function* () {
    // Call the listbooks function
    yield (0, booksctrl_1.listbooks)(req, res);
    // Assert the response status and data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        code: 0,
        msg: 'Books data found',
        data: [
            { id: 1, title: 'Book 1', author: 'Author 1', publishedYear: 2022, genres: 'Genre 1' },
            { id: 2, title: 'Book 2', author: 'Author 2', publishedYear: 2021, genres: 'Genre 2' },
        ],
    });
    // Assert the Sequelize model method calls
    expect(sequelizeMock.models.books.findAll).toHaveBeenCalledTimes(1);
    expect(sequelizeMock.models.books.findAll).toHaveBeenCalledWith({
        attributes: { exclude: ['created_at', 'updated_at'] },
        where: {
            [sequelize_1.Op.or]: [
                { title: { [sequelize_1.Op.like]: '%Author 1%' } },
                { author: { [sequelize_1.Op.like]: '%Author 1%' } },
                { publishedYear: { [sequelize_1.Op.like]: '%Author 1%' } },
                { genres: { [sequelize_1.Op.like]: '%Author 1%' } },
            ],
        },
    });
}));
