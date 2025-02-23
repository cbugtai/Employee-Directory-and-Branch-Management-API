import * as branchService from "../src/api/v1/services/branchService"
import * as firebase from "../src/api/v1/repositories/firestoreRepository"
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot } from "node_modules/firebase-admin/lib/firestore"
import { Branch } from "../src/api/v1/models/branchModel"

jest.mock("../src/api/v1/repositories/firestoreRepository")

describe("Branch Services Test", () => {
    describe("createBranch Test", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("Should return the branch on successful request", async () => {
            //Arange
            const mockID: string = "1"
            const mockData: Partial<Branch> = {
                name: "Test Branch",
                address: "Test Address",
                phone: "123-456-7890"
            };
            (firebase.createDocument as jest.Mock).mockResolvedValue(mockID);

            //Act
            const result: Branch = await branchService.createBranch(mockData);

            // Assert
            expect(firebase.createDocument).toHaveBeenCalled();

            expect(result).toEqual({
                id: "1",
                name: "Test Branch",
                address: "Test Address",
                phone: "123-456-7890"
            });
        })
    })

    describe("getAllBranches Test", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return all branches on successful request", async () => {
            //Arrange
            const mockDocs: QueryDocumentSnapshot[] = [
                {
                    id: "branch1",
                    data: () =>
                    ({
                        name: "Vancouver Branch",
                        address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                        phone: "604-456-0022"
                    } as DocumentData),
                } as QueryDocumentSnapshot,
                {
                    id: "branch2",
                    data: () =>
                    ({
                        name: "Edmonton Branch",
                        address: "7250 82 Ave NW, Edmonton, AB, T6B 0G4",
                        phone: "780-468-6800"
                    } as DocumentData),
                } as QueryDocumentSnapshot,
            ];

            const mockSnapshot: QuerySnapshot = {
                docs: mockDocs,
            } as QuerySnapshot;
            (firebase.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

            //Act
            const result: Branch[] = await branchService.getAllBranches();

            // Assert
            expect(firebase.getDocuments).toHaveBeenCalledWith("branches");
            expect(firebase.getDocuments).toHaveBeenCalledTimes(1);
            expect(result).toHaveLength(2);

            expect(result[0]).toEqual({
                id: "branch1",
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022"
            });

            expect(result[1]).toEqual({
                id: "branch2",
                name: "Edmonton Branch",
                address: "7250 82 Ave NW, Edmonton, AB, T6B 0G4",
                phone: "780-468-6800"
            });
        })
    })

    describe("getBranch Test", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("Should return branch data with valid ID", async () => {
            //Arrange
            const mockBranchData: Partial<Branch>= {
                name: "Main Branch",
                address: "123 Main Street",
                phone: "123-456-7890"
            };
            const mockSnapshot: Partial<DocumentSnapshot> = {
                id: "1",
                data: jest.fn().mockReturnValue(mockBranchData),
            };
            (firebase.getDocumentById as jest.Mock).mockResolvedValue(mockSnapshot);

            //Act
            const result: Branch = await branchService.getBranch("1")

            //Assert
            expect(firebase.getDocumentById).toHaveBeenCalled()
            expect(result).toEqual({ id:"1", ...mockBranchData });
        })
    })

    describe("updateBranch Test", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("SHould update branch data with valid ID", async () => {
            //Arrange
            const branchId: string = "1";
            const updatedData: Partial<Branch> = {
                name: "Updated Branch Name",
                address: "Updated Address",
                phone: "987-654-3210"
            };
            (firebase.updateDocument as jest.Mock).mockResolvedValue(undefined);

            //Act
            const result: Branch = await branchService.updateBranch(branchId, updatedData)

            //Assert
            expect(firebase.updateDocument).toHaveBeenCalled()
            expect(result).toEqual({ id:branchId, ...updatedData });
        })
    })

    describe("deleteBranch Test", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
    
        it("should delete branch with valid ID", async () => {
            //Arrange
            const branchId: string = "branch1";
            (firebase.deleteDocument as jest.Mock).mockResolvedValue(undefined);
            
            //Act
            await branchService.deleteBranch(branchId);

            //Assert
            expect(firebase.deleteDocument).toHaveBeenCalled();
        });
    })
})