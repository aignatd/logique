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
exports.listbooks = listbooks;
exports.getbooks = getbooks;
exports.delbooks = delbooks;
exports.patchbooks = patchbooks;
exports.newbooks = newbooks;
const booksmdl_1 = __importDefault(require("../models/booksmdl"));
const sequelize_1 = require("sequelize");
/**
 * This function retrieves a list of books based on the provided query parameters.
 * If a search query is provided, it performs a case-insensitive search on the title, author, published year, and genres.
 * The function returns a paginated list of books, excluding the 'created_at' and 'updated_at' fields.
 *
 * @param {Request} req - The Express request object containing query parameters.
 * @param {Response} res - The Express response object to send the HTTP response.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns {Promise<void>} - A promise that resolves when the HTTP response is sent.
 */
function listbooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            console.log("---------- Get Books List ----------");
            console.log("Query ->", req.query);
            var result;
            if ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.search)
                result = yield booksmdl_1.default.findAll({
                    attributes: {
                        exclude: ['created_at', 'updated_at']
                    },
                    where: {
                        [sequelize_1.Op.or]: [
                            { title: { [sequelize_1.Op.like]: '%' + req.query.search + '%' } },
                            { author: { [sequelize_1.Op.like]: '%' + req.query.search + '%' } },
                            { publishedYear: { [sequelize_1.Op.like]: '%' + req.query.search + '%' } },
                            { genres: { [sequelize_1.Op.like]: '%' + req.query.search + '%' } }
                        ]
                    },
                    offset: Number(req.query.page) - 1,
                    limit: Number(req.query.limit)
                });
            else
                result = yield booksmdl_1.default.findAll({
                    attributes: {
                        exclude: ['created_at', 'updated_at']
                    }
                });
            console.log("Result ->", result.length);
            if (result.length >= 1)
                res.status(200).json({
                    code: 0,
                    msg: "Books data found",
                    data: result
                });
            else
                res.status(404).json({
                    code: 1000,
                    msg: "Books data not found",
                    data: []
                });
        }
        catch (err) {
            console.log(err.toString());
            res.status(500).json({
                code: 3000,
                msg: err
            });
        }
    });
}
;
/**
 * Retrieves a book record based on the provided ID.
 *
 * @param {Request} req - The Express request object containing the book ID in the parameters.
 * @param {Response} res - The Express response object to send the HTTP response.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns {Promise<void>} - A promise that resolves when the HTTP response is sent.
 *
 * @throws Will throw an error if the book ID is not provided or if an error occurs during database operations.
 *
 * @remarks
 * This function logs the request parameters and queries the database for the book record.
 * If a book is found, it sends a 200 OK response with the book data.
 * If no book is found, it sends a 404 Not Found response.
 * If an error occurs, it sends a 500 Internal Server Error response with the error details.
 */
function getbooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("---------- Get Book Data ----------");
            console.log('Parameter id ->', req.params.id);
            const result = yield booksmdl_1.default.findOne({ where: { id: req.params.id }, attributes: { exclude: ['created_at', 'updated_at'] } });
            console.log("Result ->", result);
            if (result) {
                res.status(200).json({
                    code: 0,
                    msg: "Book data found",
                    data: [result]
                });
            }
            else
                res.status(404).json({
                    code: 1001,
                    msg: "Book data not found",
                    data: []
                });
        }
        catch (err) {
            console.log(err.toString());
            res.status(500).json({
                code: 3000,
                msg: err
            });
        }
    });
}
;
/**
 * Deletes a book record based on the provided ID.
 *
 * @param {Request} req - The Express request object containing the book ID in the parameters.
 * @param {Response} res - The Express response object to send the HTTP response.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns {Promise<void>} - A promise that resolves when the HTTP response is sent.
 *
 * @throws Will throw an error if the book ID is not provided or if an error occurs during database operations.
 *
 * @remarks
 * This function logs the request parameters and queries the database for the book record.
 * If a book is found and deleted successfully, it sends a 200 OK response with a success message.
 * If no book is found, it sends a 404 Not Found response.
 * If an error occurs, it sends a 500 Internal Server Error response with the error details.
 */
function delbooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("---------- Delete Book ----------");
            console.log('Parameter id ->', req.params.id);
            const result = yield booksmdl_1.default.destroy({ where: { id: req.params.id } });
            console.log("Result ->", result);
            if (result == null || result == 0)
                res.status(404).json({
                    code: 1002,
                    msg: "Book data not found"
                });
            else {
                res.status(200).json({
                    code: 0,
                    msg: "Book data deleted"
                });
            }
        }
        catch (err) {
            console.log(err.toString());
            res.status(500).json({
                code: 3000,
                msg: err
            });
        }
    });
}
;
/**
 * Updates a book record in the database based on the provided ID and request body.
 *
 * @param {Request} req - The Express request object containing the book ID in the parameters and the updated book data in the body.
 * @param {Response} res - The Express response object to send the HTTP response.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns {Promise<void>} - A promise that resolves when the HTTP response is sent.
 *
 * @throws Will throw an error if the book ID is not provided or if an error occurs during database operations.
 *
 * @remarks
 * This function logs the request parameters and body, then queries the database to update the book record.
 * If a book is found and updated successfully, it sends a 200 OK response with a success message.
 * If no book is found, it sends a 404 Not Found response.
 * If an error occurs, it sends a 500 Internal Server Error response with the error details.
 */
function patchbooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("---------- Update Book ----------");
            console.log('Body ->', req.body);
            console.log('Parameter id ->', req.params.id);
            const [result] = yield booksmdl_1.default.update(Object.assign({}, req.body), { where: { id: req.params.id } });
            console.log("Result ->", result);
            if (result == 0)
                res.status(404).json({
                    code: 1003,
                    msg: "Book data not updated"
                });
            else
                res.status(200).json({
                    code: 0,
                    msg: "Book data updated"
                });
        }
        catch (err) {
            console.log(err.toString());
            res.status(500).json({
                code: 3000,
                msg: err
            });
        }
    });
}
;
/**
 * This function handles the creation of a new book record in the database.
 *
 * @param {Request} req - The Express request object containing the new book data in the body.
 * @param {Response} res - The Express response object to send the HTTP response.
 *
 * @returns {Promise<void>} - A promise that resolves when the HTTP response is sent.
 *
 * @throws Will throw an error if an error occurs during database operations.
 *
 * @remarks
 * This function logs the request body, then queries the database to create a new book record.
 * If the book is successfully saved, it sends a 200 OK response with a success message.
 * If an error occurs during the save operation, it sends a 400 Bad Request response with an error message.
 * If an unexpected error occurs, it sends a 500 Internal Server Error response with the error details.
 */
function newbooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("---------- New Product ----------");
            console.log('Body ->', req.body);
            const result = yield booksmdl_1.default.create(Object.assign({}, req.body));
            console.log("Result ->", result);
            if (result)
                res.status(200).json({
                    code: 0,
                    msg: "New book saved"
                });
            else
                res.status(400).json({
                    code: 1004,
                    msg: "Book not saved"
                });
        }
        catch (err) {
            console.log(err.toString());
            res.status(500).json({
                code: 3000,
                msg: err
            });
        }
    });
}
;
