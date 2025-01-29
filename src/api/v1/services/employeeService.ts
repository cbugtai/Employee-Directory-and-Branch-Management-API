import { Employee } from "../../../models/employeeModel";
import employees from "../../../data/employeeData";

//Create Employee

//Get All Employees
export const getAllEmployees = (): Employee[] => {
    return employees;
}

//Get Employee by ID
//Update Employee
//Delete Employee