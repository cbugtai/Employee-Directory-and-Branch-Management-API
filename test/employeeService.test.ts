import * as employeeService from "../src/api/v1/services/employeeService";
import * as firebase from "../src/api/v1/repositories/firestoreRepository";
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot } from "node_modules/firebase-admin/lib/firestore";
import { Employee } from "../src/api/v1/models/employeeModel";

jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Employee Services Test", () => {
    describe("addEmployee Test", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("Should return the employee on successful request", async () => {
            const mockID: string = "1";
            const mockData: Partial<Employee> = {
                name: "John Doe",
                position: "Software Engineer",
                department: "Engineering",
                email: "johndoe@example.com",
                phone: "123-456-7890",
                branchID: "branch1"
            };
            (firebase.createDocument as jest.Mock).mockResolvedValue(mockID);

            const result: Employee = await employeeService.addEmployee(mockData);

            expect(firebase.createDocument).toHaveBeenCalled();
            expect(result).toEqual({
                id: "1",
                ...mockData
            });
        });
    });

    describe("getAllEmployees Test", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return all employees on successful request", async () => {
            const mockDocs: QueryDocumentSnapshot[] = [
                {
                    id: "emp1",
                    data: () => ({
                        name: "Jane Doe",
                        position: "Product Manager",
                        department: "Product",
                        email: "janedoe@example.com",
                        phone: "987-654-3210",
                        branchID: "branch2"
                    } as DocumentData),
                } as QueryDocumentSnapshot
            ];

            (firebase.getDocuments as jest.Mock).mockResolvedValue({ docs: mockDocs } as QuerySnapshot);

            const result: Employee[] = await employeeService.getAllEmployees();

            expect(firebase.getDocuments).toHaveBeenCalled();
            expect(result).toEqual([
                {
                    id: "emp1",
                    name: "Jane Doe",
                    position: "Product Manager",
                    department: "Product",
                    email: "janedoe@example.com",
                    phone: "987-654-3210",
                    branchID: "branch2"
                }
            ]);
        });
    });

    describe("getEmployee Test", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return employee data for a valid ID", async () => {
            const mockDoc: Partial<DocumentSnapshot> = {
                id: "emp1",
                data: () => ({
                    name: "Jane Doe",
                    position: "Product Manager",
                    department: "Product",
                    email: "janedoe@example.com",
                    phone: "987-654-3210",
                    branchID: "branch2"
                })
            };

            (firebase.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

            const result: Employee = await employeeService.getEmployee("emp1");

            expect(firebase.getDocumentById).toHaveBeenCalledWith("employees", "emp1");
            expect(result).toEqual({
                id: "emp1",
                name: "Jane Doe",
                position: "Product Manager",
                department: "Product",
                email: "janedoe@example.com",
                phone: "987-654-3210",
                branchID: "branch2"
            });
        });
    });

    describe("updateEmployee Test", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should update employee data for a valid ID", async () => {
            const updatedData: Partial<Employee> = {
                position: "Senior Product Manager",
                phone: "111-222-3333"
            };

            (firebase.updateDocument as jest.Mock).mockResolvedValue(undefined);

            await employeeService.updateEmployee("emp1", updatedData);

            expect(firebase.updateDocument).toHaveBeenCalledWith("employees", "emp1", updatedData);
        });
    });

    describe("deleteEmployee Test", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should delete employee for a valid ID", async () => {
            (firebase.deleteDocument as jest.Mock).mockResolvedValue(undefined);

            await employeeService.deleteEmployee("emp1");

            expect(firebase.deleteDocument).toHaveBeenCalledWith("employees", "emp1");
        });
    });
});
