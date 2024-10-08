import authclass from '../classes/authclass';
import { NextFunction, Request, Response } from 'express';

/**
 * This function handles the process of generating a token for a user.
 * It takes a request and response object as parameters.
 *
 * @param req - The request object containing the user's credentials.
 * @param res - The response object to send back the token and related information.
 *
 * @returns {Promise<void>} - The function does not return any value.
 *
 * @throws Will throw an error if there is an issue with the request or token generation.
 */
export async function gettoken(req: Request, res: Response): Promise<void> { 
	try {
		console.log("---------- Get Token ----------");

		const { username, password } = await new authclass(req).checkRequest();
		console.log("Username ->", username);

		if (username && password) {
			const { token, lastdatetime } = await new authclass(req).createToken(username, password);

			res.status(200).json(
				{
					code: 0,
					msg: "Token generated successfully",
					data: {
						"tokenExpiry": lastdatetime,
						"tokenData": token,
						"tokenType": "bearer"
					}
				});
		}
		else
			res.status(401).json(
				{
					code: 4000,
					msg: "You are not authorized"
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
 * This function is responsible for verifying the validity of a JWT token.
 * It checks the token's existence, expiration, and validity.
 *
 * @param req - The request object containing the token in the 'authorization' header.
 * @param res - The response object to send back the verification result and related information.
 * @param next - The next middleware function in the request-response cycle.
 *
 * @returns {Promise<void>} - The function does not return any value.
 *
 * @throws Will throw an error if there is an issue with the request or token verification.
 */
export async function checktoken(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		console.log("---------- Check Token ----------");

		if (req.headers.authorization) {
			const { status, result } = await new authclass(req).checkToken();
			console.log("Result ->", result);

			if (status)
				next();
			else {
				if (result === "TokenExpiredError")
					res.status(401).json(
						{
							code: 4001,
							msg: "Token has expired"
						});
				else
				if (result === "JsonWebTokenError")
					res.status(403).json(
						{
							code: 4002,
							msg: "The token is not valid"
						});
				else
					res.status(400).json(
						{
							code: 4003,
							msg: "Check existing token"
						});
			}
		}
		else {
			console.log("Failed -> Missing token data");
			res.status(403).json(
				{
					code: 4004,
					msg: "Token not found"
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