import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../models/employeeModel";

/**
 * @description Create Employee.
 * @route POST v1/employees/
 */
export const createEmployee = (req: Request, res: Response): void => {
    try {
        const employeeData: Employee = req.body;
        const newEmployee: Employee = employeeService.addEmployee(employeeData);
        res.status(201).json({ message: "Employee Added", data: newEmployee });
    } catch {
        res.status(500).json({ message: "Error Adding Employee" });
    }
};

/**
 * @description Get All Employeees.
 * @route GET v1/employees/
 */
export const getAllEmployees = (req: Request, res: Response): void => {
    try {
        const employees: Employee[] = employeeService.getAllEmployees();
        res.status(200).json({ message: "Employees Retrieved", data: employees });
    } catch {
        res.status(500).json({ message: "Error Retrieving Employees"});
    }
}

/**
 * @description Get Employeee By ID.
 * @route GET v1/employees/:id
 */
export const getEmployee = (req: Request, res: Response): void => {
    try{
        const { id } = req.params;
        const result: Employee | undefined = employeeService.getEmployee(id); 
        if (result){
            res.status(200).json({ message: `Employee ID ${id} Retrieved`, data: result});
        } else {
            res.status(404).json({ message: `Employee ID ${id} Not Found`});
        }
    } catch {
        res.status(500).json({ message: `Error Retrieving Employee`});
    }
}

/**
 * @description Update Employee.
 * @route PUT v1/employees/:id
 */
export const updateEmployee = (req:Request, res: Response): void => {
    try{
        const { id } = req.params;
        const updatedData: Employee = req.body;
        const updatedEmployee: Partial<Employee> = employeeService.updateEmployee(id, updatedData);
        if (updatedEmployee) {
            res.status(200).json({ message: `Employee ID: ${id}, Updated`, data: updatedEmployee});
        } else {
            res.status(404).json({ message: `Employee ID: ${id}, Not Found`});
        }
    } catch {
        res.status(500).json({ message: `Error Updating Employee`});
    }
}

/**
 * @description Delete Employee.
 * @route DELETE v1/employees/:id
 */
export const deleteEmployee = (req:Request, res:Response): void => {
    try{
        const { id } = req.params;
        const success: boolean = employeeService.deleteEmployee(id);
        if (success){
            res.status(200).json({ message: `Employee ID: ${id}, Deleted`});
        } else {
            res.status(404).json({ message: `Employee ID: ${id}, Not Found`});
        }
    } catch {
        res.status(500).json({ message: `Error Deleting Employee`});
    }
}