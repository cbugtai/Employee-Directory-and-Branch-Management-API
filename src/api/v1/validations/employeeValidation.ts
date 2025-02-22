import Joi, { ObjectSchema } from "joi";

export const employeeSchema: ObjectSchema = Joi.object({
    id: Joi.string().optional()
        .messages({
            "string.base": "ID must be a string"
        }),
    name: Joi.string().required()
        .messages({
            "any.required": "Name is required",
            "string.empty": "Name cannot be empty."
        }),
    position: Joi.string().required()
        .messages({
            "any.required": "Position is required",
            "string.empty": "Position cannot be empty."
        }),
    department: Joi.string().required()
        .messages({
            "any.required": "Department is required",
            "string.empty": "Department cannot be empty."
        }),
    email: Joi.string().email({ tlds: { allow: false } }).required()
        .messages({
            "any.required": "Email is required",
            "string.empty": "Email cannot be empty.",
            "string.email": "Email must be a valid email address"
        }),
    phone: Joi.string().pattern(/^\+?[0-9\s\-()]{7,20}$/).required()
        .messages({
            "any.required": "Phone number is required",
            "string.empty": "Phone cannot be empty.",
            "string.pattern.base": "Phone number format is invalid; only digits, spaces, dashes or parentheses allowed"
        }),
    branchID: Joi.string().pattern(/^\d+$/).required()
        .messages({
            "any.required": "Branch Id is required",
            "string.empty": "Branch Id cannot be empty.",
            "string.pattern.base": "Branch Id must be a number" 
        })
})

export const employeeIdSchema: ObjectSchema = Joi.object({
    id: Joi.string().pattern(/^\d+$/).required()
        .messages({
            "any.required": "Id is required",
            "string.empty": "Id cannot be empty.",
            "string.pattern.base": "Id must be a number" 
        })
});

export const departmentSchema: ObjectSchema = Joi.object({
    department: Joi.string().required()
        .messages({
            "any.required": "Department is required",
            "string.empty": "Department cannot be empty."
        }),
})