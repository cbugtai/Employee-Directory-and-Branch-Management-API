import { Employee } from "../models/employeeModel"
import Employees from "../data/employeeData"

//Create Employee

//Get All Employees
export const getAllEmployees = (): Employee[] => {
    return Employees;
}

//Get Employee by ID
//Update Employee
//Delete Employee