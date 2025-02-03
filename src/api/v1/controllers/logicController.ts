import { Request, Response } from "express";
import * as logicService from "../services/logicService";

//Get All Employees for a Branch
export const getBranchEmployees = (req: Request, res: Response): void => {
    try{
        const { branchID } = req.params;
        const result = logicService.getBranchEmployees(branchID); 
        if (result){
            res.status(200).json({ message: `Employees in Branch ID ${branchID} Retrieved`, data: result});
        } else {
            res.status(404).json({ message: `Branch ID ${branchID} Not Found`});
        }
    } catch (error) {
        res.status(500).json({ message: `Error Retrieving Employees`});
    }
}

//Get All Employees by Department
export const getDepartmentEmployees = (req: Request, res: Response): void => {
    try{
        const { department } = req.params;
        const result = logicService.getDepartmentEmployees(department); 
        if (result){
            res.status(200).json({ message: `Employees in Department ${department} Retrieved`, data: result});
        } else {
            res.status(404).json({ message: `Department ${department} Not Found`});
        }
    } catch (error) {
        res.status(500).json({ message: `Error Retrieving Employees`});
    }
}