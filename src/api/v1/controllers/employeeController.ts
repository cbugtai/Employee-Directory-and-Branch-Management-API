import { NextFunction, Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../models/employeeModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 * @description Create Employee.
 * @route POST v1/employees/
 * @returns {Promise<void>}
 */
export const createEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const result: Employee = await employeeService.addEmployee(req.body);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(result, "Employee Added")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get All Employeees.
 * @route GET v1/employees/
 * @returns {Promise<void>}
 */
export const getAllEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const result: Employee[] = await employeeService.getAllEmployees();

        res.status(HTTP_STATUS.OK).json(
            successResponse(result, "Employees Retrieved")
        );
    } catch (error) {
        next(error);
    }
}

/**
 * @description Get Employeee By ID.
 * @route GET v1/employees/:id
 * @returns {Promise<void>}
 */
export const getEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        
        const result: Employee | undefined = await employeeService.getEmployee(req.params.id); 
        
        res.status(HTTP_STATUS.OK).json(
            successResponse(result, `Employee ID ${req.params.id} Retrieved`)
        );
    } catch (error) {
        next(error);
    }
}

/**
 * @description Update Employee.
 * @route PUT v1/employees/:id
 * @returns {Promise<void>}
 */
export const updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        
        const result: Partial<Employee> = await employeeService.updateEmployee(req.params.id, req.body);

        res.status(HTTP_STATUS.OK).json(
            successResponse(result, `Employee ID: ${req.params.id}, Updated`)
        );
    } catch (error) {
        next(error);
    }
}

/**
 * @description Delete Employee.
 * @route DELETE v1/employees/:id
 * @returns {Promise<void>}
 */
export const deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
    
        const success: boolean = await employeeService.deleteEmployee(req.params.id);

        res.status(HTTP_STATUS.OK).json(successResponse(undefined, `Employee ID: ${req.params.id}, Deleted`));
    } catch (error) {
        next(error);
    }
}