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
        !newBranchData.phone    
    ) {
        throw new Error(
            "Missing required fields. Required Fields include Name, Address and Phone Number"
        )
    }

    const previousBranchID:string = branches[branches.length -1]?.id || "0";

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
/**
 * Updates Existing Branch Data
 * 
 * @param id - id of the branch to be updated
 * @param updatedData - object with updated Branch Data
 * @throws {Error} - error when branch id doesnt exist
 * @returns {Branch} - the updated Branch Data
 */
export const updateBranch = (id: string, updatedData: Partial<Branch>): Branch => {
    const branch:Branch | undefined = branches.find(branch => branch.id === id);
    
    if (typeof branch === "undefined"){
        throw new Error(`Branch with ID ${id} not found.`)
    }

    const safeUpdate = {...updatedData};
    delete safeUpdate.id;

    Object.assign(branch, safeUpdate);
    return branch;
}

//Delete Branch
/**
 * Remove a Branch from the branches array 
 * 
 * @param id - id of the Branch to be deleted.
 * @returns {boolean} - returns true if Branch was remove, false if not
 */
export const deleteBranch = (id: string): boolean => {
    const index = branches.findIndex(branch => branch.id == id);
    if (index !== -1){
        branches.splice(index, 1);
        return true;
    }
    return false;
}