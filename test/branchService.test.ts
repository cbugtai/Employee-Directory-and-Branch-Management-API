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
})