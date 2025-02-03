import { Branch } from "../../../models/branchModel";
import branches from "../../../data/branchData";

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

//Get Branch by ID

//Update Branch

//Delete Branch