// External library imports
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

// Internal module imports
import { MiddlewareFunction, RequestData } from "../types/expressTypes";
import { HTTP_STATUS } from "../../../constants/httpConstants";


/**
 * Function to validate data using a schema.
 * @param {ObjectSchema} schema - The Joi schema to validate against.
 * @param {T} data - The data to be validated.
 * @throws {Error} - Throws an error if validation fails.
 */
export const validate = <T>(schema: ObjectSchema<T>, data: T): void => {
	const { error } = schema.validate(data, { abortEarly: false });
	if (error) {
		throw new Error(
			`Validation error: ${error.details
				.map((x) => x.message)
				.join(", ")}`
		);
	}
};

/**
 * Middleware to validate a request based on the schema.
 * Combines all parts of the request (body, params, query) for validation.
 * @param {ObjectSchema} schema - The Joi schema to validate against.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} The middleware function.
 */
export const validateRequest = (schema: ObjectSchema, source: "body" | "params" | "query"): MiddlewareFunction => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const data: RequestData = {
				...req[source],
			};
			validate(schema, data);
			next();
		} catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: (error as Error).message,
            });
		}
	};
};