import mdlBooks from '../models/booksmdl';
import { Op } from 'sequelize';

import { Request, Response, NextFunction } from 'express';

export async function listbooks(req: Request, res: Response, next: NextFunction) {
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

export async function getbooks(req: Request, res: Response, next: NextFunction){
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

export async function delbooks(req: Request, res: Response, next: NextFunction) {
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

export async function patchbooks(req: Request, res: Response, next: NextFunction) {
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

export async function newbooks(req: Request, res: Response) {
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
