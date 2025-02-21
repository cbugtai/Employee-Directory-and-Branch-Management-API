import Joi, { ObjectSchema } from "joi";

export const branchSchema: ObjectSchema = Joi.object({
    id: Joi.string().optional()
        .messages({
            "string.base": "ID must be a string"
        }),
    name: Joi.string().required()
        .messages({
            "any.required": "Name is required",
            "string.empty": "Name cannot be empty."
        }),
    address: Joi.string().required()
        .messages({
            "any.required": "Address is required",
            "string.empty": "Address cannot be empty."
        }), 
    phone: Joi.string().pattern(/^\+?[0-9\s\-()]{7,20}$/).required()
        .messages({
            "any.required": "Phone number is required",
            "string.empty": "Phone number cannot be empty.",
            "string.pattern.base": "Phone number format is invalid; only digits, spaces, dashes or parentheses allowed"
        }), 
})

export const branchIdSchema: ObjectSchema = Joi.object({
    id: Joi.string().min(0).required()
        .messages({
            "any.required": "Name is required",
            "string.empty": "Name cannot be empty.",
            "string.min": "Branch Id must be a positive number" 
        })
});