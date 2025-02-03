import { Employee } from "../../../models/employeeModel";
import employees from "../../../data/employeeData";

/**
 * Get All Employees for a given Branch
 * 
 * @param branchID - Id of the branch
 * @returns {Employee[]} - list of employees in in the given branch
 */
export const getBranchEmployees = (branchID: string): Employee[] | undefined => {
    return employees.filter(employee => employee.branchID === branchID);
}

/**
 * get all employees for a given department
 * 
 * @param department - department name 
 * @returns {Employee[]} - list of employees in the given department
 */
export const getDepartmentEmployees = (department: string): Employee[] | undefined => {
    return employees.filter(employee => employee.department === department);
}