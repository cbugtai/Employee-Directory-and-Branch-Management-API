import { Employee } from "../models/employeeModel";
import employees from "../../../data/employeeData";

//Create Employee
/**
 * Adds new employee
 * 
 * @param employeeData employee information, must include Name, Position, Department, Email, Phone and BranchID
 * @throws {error} when any of the required fields are missing
 * @returns {Employee} the new employee with generated ID 
 */
export const addEmployee = (newEmployeeData: Omit<Employee, "id">): Employee => {
    if (
        !newEmployeeData.name       || 
        !newEmployeeData.position   || 
        !newEmployeeData.department ||
        !newEmployeeData.email      ||
        !newEmployeeData.phone      ||
        !newEmployeeData.branchID
    ) {
        throw new Error(
            "Missing required fields. Required Fields include: Name, Position, Department, Email, Phone and BranchID"
        );
    }

    const previousEmployeeID: string = employees[employees.length -1]?.id || "0";

    const newEmployee: Employee = {
        id:         (Number(previousEmployeeID) + 1).toString(),
        ...newEmployeeData
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
 * @param id - id of the employee to be updated
 * @param updatedData - Employee data with updated fields
 * @throws {Error} When given Employee ID doesnt exist
 * @returns {Employee} The updated employee data
 */
export const updateEmployee = (id:string, updatedData: Partial<Employee>): Partial<Employee> => {
    const employee: Partial<Employee> | undefined = employees.find(employee => employee.id === id);

    if (typeof employee === "undefined"){
        throw new Error(`Employee with ID ${id} not found.`)
    }

    const safeUpdate: Partial<Employee> = {...updatedData};
    delete safeUpdate.id;

    Object.assign(employee, safeUpdate);
    return employee;
}

//Delete Employee
/**
 * removes an employee from the employees database
 * 
 * @param id - id of the employee to be deleted
 * @returns {boolean} true if employee was removed, false otherwise
 */
export const deleteEmployee = (id:string): boolean => {
    const index: number = employees.findIndex(employee => employee.id === id);
    if (index !== -1){
        employees.splice(index, 1);
        return true;
    }
    return false;
}