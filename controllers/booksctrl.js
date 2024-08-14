const mdlBooks = require('../models/booksmdl');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

let listbooks = async (req, res, next) => {
	try {
		console.log("---------- Get Books List ----------");
		console.log("Query ->", req.query);

		var result;

		if(req?.query?.search)
			result = await mdlBooks.findAll({
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				where: {
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
	} catch (err) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

let getbooks = async (req, res, next) => {
	try {
		console.log("---------- Get Book Data ----------");
		console.log('Param field ->', req.params.field)
		console.log('Param data ->', req.params.data)

		var jsonObj = {};
		jsonObj[req.params.field] = req.params.data;

		const result = await mdlBooks.findOne({ where: jsonObj, attributes: {exclude: ['created_at', 'updated_at']} });
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
	} catch (err) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

let delbooks = async (req, res, next) => {
	try {
		console.log("---------- Delete Book ----------");
		console.log('Param field ->', req.params.field)
		console.log('Param data ->', req.params.data)

		var jsonObj = {};
		jsonObj[req.params.field] = req.params.data;

		const result = await mdlBooks.destroy({ where: jsonObj });
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
	} catch (err) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

let patchbooks = async (req, res, next) => {
	try {
		console.log("---------- Update Book ----------");
		console.log('Body ->', req.body)
		console.log('Param field ->', req.params.field)
		console.log('Param data ->', req.params.data)

		var jsonObj = {};
		jsonObj[req.params.field] = req.params.data;

		const [result] = await mdlBooks.update(
			{ ...req.body },
			{ where: jsonObj }
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
} catch (err) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

let newbooks = async (req, res) => {
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
	} catch (err) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

module.exports = {
	listbooks, getbooks, delbooks, patchbooks, newbooks
}
