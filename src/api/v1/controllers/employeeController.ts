import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

//create Employee
export const createEmployee = (req: Request, res: Response): void => {
    try {
        const newEmployee = req.body;
        const createdEmployee = employeeService.createEmployee(newEmployee);
        res.status(201).json({ message: "Employee Added", data: createdEmployee });
    } catch (error) {
        res.status(500).json({ message: "Error Adding Employee" });
    }
};