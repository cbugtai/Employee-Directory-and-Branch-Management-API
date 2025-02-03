import { Branch } from "../../../models/branchModel";
import branches from "../../../data/branchData";
import { Employee } from "src/models/employeeModel";
import employees from "src/data/employeeData";

//Create Branch
/**
 * Adds new Branch
 * 
 * @param newBranchData - branch information, must include Branch name, Address and Phone Number 
 * @throws {error} when any of the required fields missing
 * @returns {Branch} The new Branch with generated ID
 */
export const createBranch = (newBranchData: Omit<Branch, "id">): Branch => {
    if (
        !newBranchData.name     ||
        !newBranchData.address  ||
        !newBranchData.phone    ||
    ) {
        throw new Error(
            "Missing required fields. Required Fields include Name, Address and Phone Number"
        )
    }

    const previousBranchID = branches[branches.length -1]?.id || "0";

    const newBranch: Branch = {
        id:     (Number(previousBranchID) + 1).toString(),
        ...newBranchData
    }

    branches.push(newBranch);
    return newBranch
}

//Get All Branches
export const getAllBranches = (): Branch[] => {
    return branches;
}

//Get Branch by ID
/**
 * Get Branch by ID
 * 
 * @param id - id of the Branch
 * @returns {Branch} - returns Branch Data if given branch id existsotherwise returns undefined
 */
export const getBranch = (id: string): Branch | undefined => {
    return (branches.find(branch => branch.id === id));
}

//Update Branch

//Delete Branch