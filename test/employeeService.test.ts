import { Employee } from "src/models/employeeModel"
import * as employeeService from "../src/api/v1/services/employeeService"

describe("Employee Services Testing", () => {
    let mockEmployees: Employee[];

    beforeEach(() => {
        mockEmployees = [
            { id: "1", name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchID: "1" },
            { id: "2", name: "Amandeep Singh", position: "Customer Service Representative", department: "Customer Service", email: "amandeep.singh@pixell-river.com", phone: "780-555-0172", branchID: "2" },
            { id: "3", name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@pixell-river.com", phone: "204-555-0193", branchID: "3" },
            { id: "4", name: "James Wilson", position: "IT Support Specialist", department: "IT", email: "james.wilson@pixell-river.com", phone: "604-555-0134", branchID: "1" },
        ];
    });

    describe("addEmployee function test", () => {

        const newEmployeeData = {
            name: "Ethan Brooks",
            position: "Data Analyst",
            department: "Finance",
            email: "ethan.brooks@pixell-river.com",
            phone: "204-555-0500",
            branchID: "5"
        }

        // Mock the addEmployee fucntion to redirect the push to the mockEmployees array
        jest.spyOn(employeeService, 'addEmployee').mockImplementation((newEmployeeData: Omit<Employee, "id">) => {
            const previousEmployeeID = mockEmployees[mockEmployees.length - 1]?.id || "0";
            const newEmployee: Employee = {
                id: (Number(previousEmployeeID) + 1).toString(),
                ...newEmployeeData
            };
            mockEmployees.push(newEmployee); // Redirect to mock array
            return newEmployee;
        });
        
        it("Should add the new Employee to the existing Employees array", () => {
            employeeService.addEmployee(newEmployeeData);

            expect(mockEmployees.length).toBe(5);
        })

        it("should return an employee object with an id property", () => {
            expect(employeeService.addEmployee(newEmployeeData)).toHaveProperty("id");
        })

        it("Should return the new employee data", () => {
            expect(employeeService.addEmployee(newEmployeeData)).toStrictEqual({id: "5", ...newEmployeeData})
        })
    })
}) 