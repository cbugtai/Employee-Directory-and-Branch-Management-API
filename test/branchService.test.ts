import { Branch } from "../src/models/branchModel"
import * as branchService from "../src/api/v1/services/branchService"

describe("Branch Service Testing", () => {
    let MOCKbranches: Branch[];

    beforeEach(() => {
        MOCKbranches = [
            {
                id: "1",
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022"
            },
            {
                id: "2",
                name: "Edmonton Branch",
                address: "7250 82 Ave NW, Edmonton, AB, T6B 0G4",
                phone: "780-468-6800"
            }
        ]
    })

    describe("Create Branch Service Test", () => {
        const newBranchData = {
            name: "Calgary Branch",
            address: "123 4th Ave SW, Calgary, AB, T2P 3N4",
            phone: "403-123-4567"
        }

        jest.spyOn(branchService, "createBranch").mockImplementation((newBranchData: Omit<Branch, "id">) => {
            const previousBranchID = MOCKbranches[MOCKbranches.length -1]?.id || "0";
            const newBranch: Branch = {
                id: (Number(previousBranchID) + 1).toString(),
                ...newBranchData
            }
            MOCKbranches.push(newBranch);
            return newBranch;
        })

        it("Should add the new Branch to the existing Branches array", () => {
            branchService.createBranch(newBranchData);

            expect(MOCKbranches.length).toBe(3);
        })
        it("should return an Branch object with an id property", () => {
            expect(branchService.createBranch(newBranchData)).toHaveProperty("id");
        })

        it("Should return the new Branch data", () => {
            expect(branchService.createBranch(newBranchData)).toStrictEqual({id: "3", ...newBranchData})
        })
    })

    describe("Get All Branches Service Test", () => {
        jest.spyOn(branchService, "getAllBranches").mockImplementation(() => {
            return MOCKbranches;
        })

        it("Should return all Branch records as an array", () => {
            expect(branchService.getAllBranches().length).toBe(2)
        })
    })

    describe("Get Branch By ID Service Test", () => {
        jest.spyOn(branchService, "getBranch").mockImplementation((id) => {
            return (MOCKbranches.find(branch => branch.id === id));
        })

        it("Should return the Branch Data of the given Branch ID", () => {
            expect(branchService.getBranch("1")).toStrictEqual(MOCKbranches[0])
            expect(branchService.getBranch("2")).toStrictEqual(MOCKbranches[1])
        })
    })

    describe("Update Branch Service Test", () => {
        const updatedData = {
            address: "Updated Address",
            phone: "Updated Phone Number"
        }

        jest.spyOn(branchService, "updateBranch").mockImplementation((id, updatedData) => {
            const branch = MOCKbranches.find(branch => branch.id === id);
            if (typeof branch === "undefined"){
                throw new Error(`Branch with ID ${id} not found.`)
            }
            const safeUpdate = {...updatedData};
            delete safeUpdate.id;
            Object.assign(branch, safeUpdate);
            return branch;
        })

        it("Should return the updated data of the Branch", () => {
            expect(branchService.updateBranch("1",updatedData).address).toBe("Updated Address")
            expect(branchService.updateBranch("1",updatedData).phone).toBe("Updated Phone Number")
        })
        it("Should update the branch data on the branch array", () => {
            branchService.updateBranch("2",updatedData)

            expect(MOCKbranches[1].address).toBe("Updated Address")
            expect(MOCKbranches[1].phone).toBe("Updated Phone Number")
        })
    })

    describe("Delete Branch Service Test", () => {
        jest.spyOn(branchService, "deleteBranch").mockImplementation((id) => {
            const index = MOCKbranches.findIndex(branch => branch.id == id);
            if (index !== -1){
                MOCKbranches.splice(index, 1);
                return true;
            }
            return false;
        })

        it("Should return true if valid id is given", () => {
            expect(branchService.deleteBranch("1")).toBeTruthy()
        })
        it("Should return false if invalid id is given", () => {
            expect(branchService.deleteBranch("16")).toBeFalsy()
            expect(branchService.deleteBranch("sixteen")).toBeFalsy()
        })
    })
})