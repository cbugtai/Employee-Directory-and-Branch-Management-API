import { Employee } from "../../../models/employeeModel";
import employees from "../../../data/employeeData";

//Get All Employees for a Branch
export const getBranchEmployees = (branchID: string): Employee[] | undefined => {
    return employees.filter(employee => employee.branchID === branchID);
}

//Get All Employees by Department
export const getDepartmentEmployees = (department: string): Employee[] | undefined => {
    return employees.filter(employee => employee.department === department);
}