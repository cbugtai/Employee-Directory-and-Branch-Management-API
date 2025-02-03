import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

//create Employee
export const createEmployee = (req: Request, res: Response): void => {
    try {
        const employeeData = req.body;
        const newEmployee = employeeService.addEmployee(employeeData);
        res.status(201).json({ message: "Employee Added", data: newEmployee });
    } catch (error) {
        res.status(500).json({ message: "Error Adding Employee" });
    }
};

//Get All Employees
export const getAllEmployees = (req: Request, res: Response): void => {
    try {
        const employees = employeeService.getAllEmployees();
        res.status(200).json({ message: "Employees Retrieved", data: employees });
    } catch (error) {
        res.status(500).json({ message: "Error Retrieving Employees"});
    }
}

//Get Employee by ID
export const getEmployee = (req: Request, res: Response): void => {
    try{
        const { id } = req.params;
        const result = employeeService.getEmployee(id); 
        if (result){
            res.status(200).json({ message: `Employee ID ${id} Retrieved`, data: result});
        } else {
            res.status(404).json({ message: `Employee ID ${id} Not Found`});
        }
    } catch (error) {
        res.status(500).json({ message: `Error Retrieving Employee`});
    }
}

//Update Employee
export const updateEmployee = (req:Request, res: Response): void => {
    try{
        const { id } = req.params;
        const updatedData = req.body;
        const updatedEmployee = employeeService.updateEmployee(id, updatedData);
        if (updatedEmployee) {
            res.status(200).json({ message: `Employee ID: ${id}, Updated`, data: updatedEmployee});
        } else {
            res.status(404).json({ message: `Employee ID: ${id}, Not Found`});
        }
    } catch (error) {
        res.status(500).json({ message: `Error Updating Employee`});
    }
}

//Delete Employee
export const deleteEmployee = (req:Request, res:Response): void => {
    try{
        const { id } = req.params;
        const success = employeeService.deleteEmployee(id);
        if (success){
            res.status(200).json({ message: `Employee ID: ${id}, Deleted`});
        } else {
            res.status(404).json({ message: `Employee ID: ${id}, Not Found`});
        }
    } catch (error) {
        res.status(500).json({ message: `Error Deleting Employee`});
    }
}