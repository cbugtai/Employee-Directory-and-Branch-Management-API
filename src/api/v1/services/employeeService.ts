import { Employee } from "../../../models/employeeModel";
import employees from "../../../data/employeeData";

//Create Employee
/**
 * Adds new employee
 * 
 * @param employeeData employee information, must include Name, Position, Department, Email, Phone and BranchID
 * @throws {error} when any of the required fields are missing
 * @returns {Employee} the new employee with generated ID 
 */
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
        id:         (Number(previousEmployeeID) + 1).toString(),
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

/**
 * Get Employee by ID
 * 
 * @param id id of the employee
 * @returns {Employee} if employee with the given id exists otherwise returns {undefined}
 */
export const getEmployee = (id:string): Employee | undefined => {
    return (employees.find(employee => employee.id === id));
}

//Update Employee
/**
 * update existing employee data
 * 
 * @param id - id of the employee
 * @param updatedData - Employee data with updated fields
 * @throws {Error} When given Employee ID doesnt exist
 * @returns {Employee} The updated employee data
 */
export const updateEmployee = (id:string, updatedData: Partial<Employee>): Employee => {
    const employee = employees.find(employee => employee.id === id);

    if (typeof employee === "undefined"){
        throw new Error(`Employee with ID ${id} not found.`)
    }

    const safeUpdate = {...updatedData};
    delete safeUpdate.id;

    Object.assign(employee, safeUpdate);
    return employee;
}

//Delete Employee