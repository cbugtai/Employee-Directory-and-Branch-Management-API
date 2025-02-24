import * as logicService from "../src/api/v1/services/logicService"
import * as firebase from "../src/api/v1/repositories/firestoreRepository"
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from "node_modules/firebase-admin/lib/firestore";
import { Employee } from "src/api/v1/models/employeeModel";

jest.mock("../src/api/v1/repositories/firestoreRepository")

describe("Logic Service Tests", () => {
    describe("getBranchEmployees Test", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return items matching the field value", async () => {
            //Arrange
            const mockDate = new Date();
            const mockFieldName = "branchID";
            const mockFieldValue = "branch1";
            const mockDocs: QueryDocumentSnapshot[] = [
                {
                    id: "emp1",
                    data: () => ({
                        name: "Jane Doe",
                        position: "Product Manager",
                        department: "Product",
                        email: "janedoe@example.com",
                        phone: "987-654-3210",
                        branchID: "branch1"
                    } as DocumentData),
                } as QueryDocumentSnapshot,
                {
                    id: "emp2",
                    data: () => ({
                        name: "John Doe",
                        position: "Software Engineer",
                        department: "Engineering",
                        email: "johndoe@example.com",
                        phone: "123-456-7890",
                        branchID: "branch1"
                    } as DocumentData),
                } as QueryDocumentSnapshot,
            ];
            const mockSnapshot: QuerySnapshot = {
                docs: mockDocs,
            } as QuerySnapshot;

            (firebase.getDocumentsByFieldValue as jest.Mock).mockResolvedValue(
                mockSnapshot
            );

            const result: Employee[] = await logicService.getBranchEmployees(
                mockFieldValue
            );

            // Assertions
            expect(firebase.getDocumentsByFieldValue).toHaveBeenCalledWith(
                "employees",
                mockFieldName,
                mockFieldValue,
            );
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                id: "emp1",
                name: "Jane Doe",
                position: "Product Manager",
                department: "Product",
                email: "janedoe@example.com",
                phone: "987-654-3210",
                branchID: "branch1"
            });
            expect(result[1]).toEqual({
                id: "emp2",
                name: "John Doe",
                position: "Software Engineer",
                department: "Engineering",
                email: "johndoe@example.com",
                phone: "123-456-7890",
                branchID: "branch1"
            });
        });

        it("should handle empty results by passing through the repository error", async () => {
            const mockFieldName = "branchID";
            const mockFieldValue = "nonexistent";

            const mockError = new Error(
                `No documents found in collection items where ${mockFieldName} == ${mockFieldValue}`
            );

            (firebase.getDocumentsByFieldValue as jest.Mock).mockRejectedValue(
                mockError
            );

            // Expect the service to pass through the error from the repository
            await expect(
                logicService.getBranchEmployees(mockFieldValue)
            ).rejects.toThrow(mockError);

            expect(firebase.getDocumentsByFieldValue).toHaveBeenCalledWith(
                "employees",
                mockFieldName,
                mockFieldValue,
            );
        });

    });

    describe("getDepartmentEmployees Test", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return employees matching the department", async () => {
            // Arrange
            const mockDepartment = "Engineering";
            const mockDocs: QueryDocumentSnapshot[] = [
                {
                    id: "emp1",
                    data: () => ({
                        name: "Alice Smith",
                        position: "Software Engineer",
                        department: "Engineering",
                        email: "alice@example.com",
                        phone: "111-222-3333",
                        branchID: "branch2"
                    } as DocumentData),
                } as QueryDocumentSnapshot,
                {
                    id: "emp2",
                    data: () => ({
                        name: "Bob Johnson",
                        position: "DevOps Engineer",
                        department: "Engineering",
                        email: "bob@example.com",
                        phone: "444-555-6666",
                        branchID: "branch3"
                    } as DocumentData),
                } as QueryDocumentSnapshot,
            ];

            const mockSnapshot: QuerySnapshot = {
                docs: mockDocs,
            } as QuerySnapshot;

            (firebase.getDocumentsByFieldValue as jest.Mock).mockResolvedValue(
                mockSnapshot
            );

            const result: Employee[] = await logicService.getDepartmentEmployees(mockDepartment);

            // Assertions
            expect(firebase.getDocumentsByFieldValue).toHaveBeenCalledWith(
                "employees",
                "department",
                mockDepartment
            );
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                id: "emp1",
                name: "Alice Smith",
                position: "Software Engineer",
                department: "Engineering",
                email: "alice@example.com",
                phone: "111-222-3333",
                branchID: "branch2"
            });
            expect(result[1]).toEqual({
                id: "emp2",
                name: "Bob Johnson",
                position: "DevOps Engineer",
                department: "Engineering",
                email: "bob@example.com",
                phone: "444-555-6666",
                branchID: "branch3"
            });
        });

        it("should handle empty results by passing through the repository error", async () => {
            const mockDepartment = "NonExistentDepartment";
            const mockError = new Error(
                `No documents found in collection items where department == ${mockDepartment}`
            );

            (firebase.getDocumentsByFieldValue as jest.Mock).mockRejectedValue(
                mockError
            );

            await expect(
                logicService.getDepartmentEmployees(mockDepartment)
            ).rejects.toThrow(mockError);

            expect(firebase.getDocumentsByFieldValue).toHaveBeenCalledWith(
                "employees",
                "department",
                mockDepartment
            );
        });
    });
});