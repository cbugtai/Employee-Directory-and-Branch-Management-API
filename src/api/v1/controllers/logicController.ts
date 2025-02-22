import { Request, Response } from "express";
import * as logicService from "../services/logicService";
import { Employee } from "../models/employeeModel";

/** 
 * @description Get All Employees for a Branch
 * @route GET v1/employees/branch/:branchID
 */
export const getBranchEmployees = (req: Request, res: Response): void => {
    try{
        const { branchID } = req.params;
        const result: Employee[] | undefined = logicService.getBranchEmployees(branchID); 
        if (result){
            res.status(200).json({ message: `Employees in Branch ID ${branchID} Retrieved`, data: result});
        } else {
            res.status(404).json({ message: `Branch ID ${branchID} Not Found`});
        }
    } catch {
        res.status(500).json({ message: `Error Retrieving Employees`});
    }
}

/** 
 * @description Get All Employees by Department
 * @route GET v1/employees//department/:department
 */
export const getDepartmentEmployees = (req: Request, res: Response): void => {
    try{
        const { department } = req.params;
        const result: Employee[] | undefined = logicService.getDepartmentEmployees(department); 
        if (result){
            res.status(200).json({ message: `Employees in ${department} Department Retrieved`, data: result});
        } else {
            res.status(404).json({ message: `${department} Department Not Found`});
        }
    } catch {
        res.status(500).json({ message: `Error Retrieving Employees`});
    }
}