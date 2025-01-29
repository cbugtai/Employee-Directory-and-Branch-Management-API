import { Employee } from "../../../models/employeeModel";
import employees from "../../../data/employeeData";

//Create Employee
export const addEmployee = (employeeData: Omit<Employee, "id">): Employee => {
    if (
        !employeeData.name       || 
        !employeeData.position   || 
        !employeeData.department ||
        !employeeData.email      ||
        !employeeData.phone      ||
        !employeeData.branchID
    ) {
        throw new Error(
            "Missing required fields. Required Fields include: Name, Position, Department, Email, Phone and BranchID"
        );
    }

    const previousEmployeeID = employees[employees.length -1].id;

    const newEmployee: Employee = {
        id:         previousEmployeeID + 1,
        name:       employeeData.name,
        position:   employeeData.position,
        department: employeeData.department,
        email:      employeeData.email,
        phone:      employeeData.phone,
        branchID:   employeeData.branchID
    }

    employees.push(newEmployee);
    return newEmployee;
}

//Get All Employees
export const getAllEmployees = (): Employee[] => {
    return employees;
}

//Get Employee by ID
//Update Employee
//Delete Employee