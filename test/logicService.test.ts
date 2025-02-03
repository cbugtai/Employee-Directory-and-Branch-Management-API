import employees from "../src/data/employeeData"
import * as logicService from "../src/api/v1/services/logicService"

describe("Logical Operations Service Testing", () => {
    describe("Get Branch Employees Service Test", () => {
        it("Should return an array of employees belonging to a specific branch", () => {
            expect(logicService.getBranchEmployees("1")?.length).toBe(3)
            expect(logicService.getBranchEmployees("2"))
                .toStrictEqual(employees.filter(employee => employee.branchID === "2"))
        })
    })

    describe("Get Department Employees Service Test", () => {
        it("Should return an array of employees belonging to a specific department", () => {
            expect(logicService.getDepartmentEmployees("Management")?.length).toBe(3)
            expect(logicService.getDepartmentEmployees("IT"))
                .toStrictEqual(employees.filter(employee => employee.department === "IT"))
        })
    })
})