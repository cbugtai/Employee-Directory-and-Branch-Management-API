import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../models/branchModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 * @description Create Branch.
 * @route POST v1/branch/
 * @returns {Promise<void>}
 */
export const createBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const result: Branch = await branchService.createBranch(req.body);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(result, "Branch Added")
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

        const result: Branch[] = await branchService.getAllBranches();

        res.status(HTTP_STATUS.OK).json(
            successResponse(result, "Branches Retrieved")
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

        const result: Branch = await branchService.updateBranch(req.params.id, req.body);

        res.status(HTTP_STATUS.OK).json(
            successResponse(result, `Branch ID ${req.params.id} Updated`)
        );
    } catch (error) {
        next(error);
    }
}

/**
 * @description Delete Branch.
 * @route DELETE v1/branch/:id
 * @returns {Promise<void>}
 */
export const deleteBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        
        const success: boolean = await branchService.deleteBranch(req.params.id);
        
        res.status(HTTP_STATUS.OK).json(successResponse(undefined, `Branch ID ${req.params.id} Deleted`));
    } catch (error) {
        next(error);
    }
}
