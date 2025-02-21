import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../models/branchModel";

/**
 * @description Create Branch.
 * @route POST v1/branch/
 */
export const createBranch = (req: Request, res: Response): void => {
    try {
        const newBranchData: Branch = req.body;
        const createdBranch: Branch = branchService.createBranch(newBranchData);
        res.status(201).json({ message: "Branch Added", data: createdBranch });
    } catch {
        res.status(500).json({ message: "Error Adding Branch" });
    }
};

/**
 * @description Get All Branches.
 * @route GET v1/branch/
 */
export const getAllBranches = (req: Request, res: Response): void => {
    try {
        const Branches: Branch[] = branchService.getAllBranches();
        res.status(200).json({ message: "Branches Retrieved", data: Branches });
    } catch {
        res.status(500).json({ message: "Error Retrieving Branches"});
    }
}

/**
 * @description Get Branche By ID.
 * @route GET v1/branch/:id
 */
export const getBranch = (req: Request, res: Response): void => {
    try{
        const { id } = req.params;
        const result: Branch | undefined = branchService.getBranch(id); 
        if (result){
            res.status(200).json({ message: `Branch ID ${id} Retrieved`, data: result});
        } else {
            res.status(404).json({ message: `Branch ID ${id} Not Found`});
        }
    } catch {
        res.status(500).json({ message: `Error Retrieving Branch`});
    }
}

/**
 * @description Update Branch.
 * @route PUT v1/branch/:id
 */
export const updateBranch = (req:Request, res: Response): void => {
    try{
        const { id } = req.params;
        const updatedData: Branch = req.body;
        const updatedBranch: Branch = branchService.updateBranch(id, updatedData);
        if (updatedBranch) {
            res.status(200).json({ message: `Branch ID ${id} Updated`, data: updatedBranch});
        } else {
            res.status(404).json({ message: `Branch ID ${id} Not Found`});
        }
    } catch {
        res.status(500).json({ message: `Error Updating Branch`});
    }
}

/**
 * @description Delete Branch.
 * @route DELETE v1/branch/:id
 */
export const deleteBranch = (req:Request, res:Response): void => {
    try{
        const { id } = req.params;
        const success: boolean = branchService.deleteBranch(id);
        if (success){
            res.status(200).json({ message: `Branch ID ${id} Deleted`});
        } else {
            res.status(404).json({ message: `Branch ID ${id} Not Found`});
        }
    } catch {
        res.status(500).json({ message: `Error Deleting Branch`});
    }
}