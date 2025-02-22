import { NextFunction, Request, Response } from "express";
import * as logicService from "../services/logicService";
import { Employee } from "../models/employeeModel";
import { HTTP_STATUS } from "src/constants/httpConstants";
import { successResponse } from "../models/responseModel";

/** 
 * @description Get All Employees for a Branch
 * @route GET v1/employees/branch/:branchID
 * @returns {Promise<void>}
 */
export const getBranchEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        
        const result: Employee[] | undefined = logicService.getBranchEmployees(req.params.branchID); 
        
        res.status(HTTP_STATUS.OK).json(
            successResponse(result, `Employees in Branch ID ${req.params.branchID} Retrieved`)
        );
    } catch (error) {
        next(error);
    }
}

/** 
 * @description Get All Employees by Department
 * @route GET v1/employees//department/:department
 * @returns {Promise<void>}
 */
export const getDepartmentEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        
        const result: Employee[] | undefined = logicService.getDepartmentEmployees(req.params.department); 
        
        res.status(HTTP_STATUS.OK).json(
            successResponse(result, `Employees in ${req.params.department} Department Retrieved`)
        );
    } catch (error) {
        next(error);
    }
}