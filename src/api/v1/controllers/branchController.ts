import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "src/models/branchModel";

//create Branch
export const createBranch = (req: Request, res: Response): void => {
    try {
        const newBranchData: Branch = req.body;
        const createdBranch: Branch = branchService.createBranch(newBranchData);
        res.status(201).json({ message: "Branch Added", data: createdBranch });
    } catch (error) {
        res.status(500).json({ message: "Error Adding Branch" });
    }
};

//Get All Branches
export const getAllBranches = (req: Request, res: Response): void => {
    try {
        const Branches: Branch[] = branchService.getAllBranches();
        res.status(200).json({ message: "Branches Retrieved", data: Branches });
    } catch (error) {
        res.status(500).json({ message: "Error Retrieving Branches"});
    }
}

//Get Branch by ID
export const getBranch = (req: Request, res: Response): void => {
    try{
        const { id } = req.params;
        const result: Branch | undefined = branchService.getBranch(id); 
        if (result){
            res.status(200).json({ message: `Branch ID ${id} Retrieved`, data: result});
        } else {
            res.status(404).json({ message: `Branch ID ${id} Not Found`});
        }
    } catch (error) {
        res.status(500).json({ message: `Error Retrieving Branch`});
    }
}

//Update Branch
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
    } catch (error) {
        res.status(500).json({ message: `Error Updating Branch`});
    }
}

//Delete Branch
export const deleteBranch = (req:Request, res:Response): void => {
    try{
        const { id } = req.params;
        const success: boolean = branchService.deleteBranch(id);
        if (success){
            res.status(200).json({ message: `Branch ID ${id} Deleted`});
        } else {
            res.status(404).json({ message: `Branch ID ${id} Not Found`});
        }
    } catch (error) {
        res.status(500).json({ message: `Error Deleting Branch`});
    }
}