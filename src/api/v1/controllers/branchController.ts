import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../models/branchModel";
import { HTTP_STATUS } from "src/constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 * @description Create Branch.
 * @route POST v1/branch/
 * @returns {Promise<void>}
 */
export const createBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const createdBranch: Branch = await branchService.createBranch(req.body);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(createdBranch, "Branch Added")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get All Branches.
 * @route GET v1/branch/
 * @returns {Promise<void>}
 */
export const getAllBranches = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const branches: Branch[] = await branchService.getAllBranches();

        res.status(HTTP_STATUS.OK).json(
            successResponse(branches, "Branches Retrieved")
        );
    } catch (error) {
        next(error);
    }
}

/**
 * @description Get Branch By ID.
 * @route GET v1/branch/:id
 * @returns {Promise<void>}
 */
export const getBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{

        const result: Branch | undefined = await branchService.getBranch(req.params.id); 
        
        res.status(HTTP_STATUS.OK).json(
            successResponse(result, `Branch ID ${req.params.id} Retrieved`)
        );
    } catch (error) {
        next(error);
    }
}

/**
 * @description Update Branch.
 * @route PUT v1/branch/:id
 * @returns {Promise<void>}
 */
export const updateBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{

        const updatedBranch: Branch = await branchService.updateBranch(req.params.id, req.body);

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedBranch, `Branch ID ${req.params.id} Updated`)
        );
    } catch (error) {
        next(error);
    }
}

/**
 * @description Delete Branch.
 * @route DELETE v1/branch/:id
 */
export const deleteBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        
        const success: boolean = branchService.deleteBranch(req.params.id);
        
        res.status(HTTP_STATUS.OK).json(
            { message: `Branch ID ${req.params.id} Deleted`}
        );
    } catch (error) {
        next(error);
    }
}
