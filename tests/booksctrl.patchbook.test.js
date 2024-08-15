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
const sequelize_1 = require("sequelize");
const mock_req_res_1 = require("mock-req-res");
/**
 * Handles the PATCH request for updating a book.
 *
 * @param {Request} req - The Express request object containing the book ID and updated data in the request body.
 * @param {Response} res - The Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @remarks
 * This function updates a book in the database using the provided ID and data.
 * It uses the Sequelize model to perform the update operation.
 * If the update is successful, it sends a 200 status code with a success message.
 * If the book ID is not found, it sends a 404 status code with a not found message.
 */
describe('Books Controller - Patch Books', () => {
    let req;
    let res;
    let sequelize;
    beforeEach(() => {
        req = (0, mock_req_res_1.mockRequest)();
        res = (0, mock_req_res_1.mockResponse)();
        sequelize = new sequelize_1.Sequelize('sqlite::memory:');
    });
    it('should update a book with valid data', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        req.params.id = '1';
        req.body = { title: 'Updated Book Title' };
        // Mock Sequelize model update method
        jest.spyOn(sequelize.models.books, 'update').mockResolvedValue([1]);
        // Act
        yield (0, booksctrl_1.patchbooks)(req, res);
        // Assert
        expect(sequelize.models.books.update).toBeCalledWith({ title: 'Updated Book Title' }, { where: { id: 1 } });
        expect(res.status).toBe(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 0,
            msg: 'Book data updated',
        });
    }));
});
/**
 * This function handles the PATCH request for updating a book.
 * It uses the provided ID and data to update the book in the database.
 *
 * @param {Request} req - The Express request object containing the book ID and updated data in the request body.
 * @param {Response} res - The Express response object to send the response.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @remarks
 * This function updates a book in the database using the provided ID and data.
 * It uses the Sequelize model to perform the update operation.
 * If the update is successful, it sends a 200 status code with a success message.
 * If the book ID is not found, it sends a 404 status code with a not found message.
 */
describe('Books Controller - Patch Books', () => {
    let req;
    let res;
    let sequelize;
    beforeEach(() => {
        req = (0, mock_req_res_1.mockRequest)();
        res = (0, mock_req_res_1.mockResponse)();
        sequelize = new sequelize_1.Sequelize('sqlite::memory:');
    });
    it('should return 404 when trying to update a non-existent book', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        req.params.id = '999999';
        req.body = { title: 'Non-existent Book Title' };
        // Mock Sequelize model update method to return 0 rows affected
        jest.spyOn(sequelize.models.books, 'update').mockResolvedValue([0]);
        // Act
        yield (0, booksctrl_1.patchbooks)(req, res);
        // Assert
        expect(sequelize.models.books.update).toHaveBeenCalledWith({ title: 'Non-existent Book Title' }, { where: { id: 999999 } });
        expect(res.status).toBe(404);
        expect(res.json).toHaveBeenCalledWith({
            code: 1003,
            msg: 'Book data not updated',
        });
    }));
});
