import mdlBooks from '../models/booksmdl';
import { Op } from 'sequelize';

import { Request, Response, NextFunction } from 'express';

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
export async function listbooks(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		console.log("---------- Get Books List ----------");
		console.log("Query ->", req.query);

		var result;

		if(req?.query?.search)
			result = await mdlBooks.findAll({
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				where:  {
					[Op.or]: [
					{ title: { [Op.like]: '%' + req.query.search + '%' }},
					{ author: { [Op.like]: '%' + req.query.search + '%' }},
					{ publishedYear: { [Op.like]: '%' + req.query.search + '%' }},
					{ genres: { [Op.like]: '%' + req.query.search + '%' }}
				]},
				offset: Number(req.query.page) - 1,
				limit: Number(req.query.limit)
			});
		else
			result = await mdlBooks.findAll({
				attributes: {
					exclude: ['created_at', 'updated_at']
				}
			});

		console.log("Result ->", result.length);

		if (result.length >= 1)
			res.status(200).json(
				{
					code: 0,
					msg: "Books data found",
					data: result
				});
		else
			res.status(404).json(
				{
					code: 1000,
					msg: "Books data not found",
					data: []
				});
	} catch (err: any) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

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
export async function getbooks(req: Request, res: Response, next: NextFunction): Promise<void>{
	try {
		console.log("---------- Get Book Data ----------");
		console.log('Parameter id ->', req.params.id);

		const result = await mdlBooks.findOne({ where: { id: req.params.id }, attributes: {exclude: ['created_at', 'updated_at']} });
		console.log("Result ->", result);

		if (result) {
			res.status(200).json(
				{
					code: 0,
					msg: "Book data found",
					data: [result]
				});
		}
		else
			res.status(404).json(
				{
					code: 1001,
					msg: "Book data not found",
					data: []
				});
	} catch (err: any) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

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
export async function delbooks(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		console.log("---------- Delete Book ----------");
		console.log('Parameter id ->', req.params.id);

		const result = await mdlBooks.destroy({ where: { id: req.params.id } });
		console.log("Result ->", result);

		if (result == null || result == 0)
			res.status(404).json(
				{
					code: 1002,
					msg: "Book data not found"
				});
		else {
			res.status(200).json(
				{
					code: 0,
					msg: "Book data deleted"
				});
		}
	} catch (err: any) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

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
export async function patchbooks(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		console.log("---------- Update Book ----------");
		console.log('Body ->', req.body)
		console.log('Parameter id ->', req.params.id);

		const [result] = await mdlBooks.update(
			{ ...req.body },
			{ where: { id: req.params.id }}
		)

		console.log("Result ->", result);

		if (result == 0)
			res.status(404).json(
				{
					code: 1003,
					msg: "Book data not updated"
				});
		else
			res.status(200).json(
			{
				code: 0,
				msg: "Book data updated"
			});
} catch (err: any) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

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
export async function newbooks(req: Request, res: Response): Promise<void> {
	try {
		console.log("---------- New Product ----------");
		console.log('Body ->', req.body)

		const result = await mdlBooks.create({ ...req.body });
		console.log("Result ->", result);

		if (result)
			res.status(200).json(
				{
					code: 0,
					msg : "New book saved"
				});
		else
			res.status(400).json(
				{
					code: 1004,
					msg: "Book not saved"
				});
	} catch (err: any) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};
