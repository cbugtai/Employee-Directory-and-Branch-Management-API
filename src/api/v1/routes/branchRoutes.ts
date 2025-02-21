import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

const router: Router = express.Router();

// "URL:/api/v1/branch"

/**
 * @description Create Branch.
 * @route POST v1/branch/
 * 
 * @openai
 * /api/v1/branch/:
 *  post:
 *    description: Create New Branch
 *    tags: [branch]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              address:
 *                type: string
 *              phone:
 *                type: string
 *    responses:
 *      200:
 *        description: Branch added
 *      500:
 *        description: Error adding branch
 */
router.post("/", branchController.createBranch)

/**
 * @description Get All Branches.
 * @route GET v1/branch/
 * 
 * @openai
 * /api/v1/branch/:
 *  get:
 *    summary: Get a list all the branches
 *    tags: [Branch]
 *    responses:
 *      200:
 *        description: Branches Retrieved.
 *      500:
 *        description: Error Retrieving Branches.
 * 
 */
router.get("/", branchController.getAllBranches)

/**
 * @description Get Branch By ID.
 * @route GET v1/branch/:id
 * 
 * @openai
 * /api/v1/branch/{id}:
 *  get:
 *    summary: Get Branch by ID
 *    tags: [Branch]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the branch to retrive
 *    responses:
 *      200:
 *        description: Branch ID ${id} Retrieved.
 *      404:
 *        description: Branch ID ${id} Not Found
 *      500:
 *        description: Error Retrieving Branch.
 */
router.get("/:id", branchController.getBranch)

/**
 * @description Update Branch.
 * @route PUT v1/branch/:id
 * 
 * @openapi
 * /api/v1/branch/{id}:
 *   put:
 *     summary: Update existing Branch data
 *     tags: [branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the branch to be updated
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              address:
 *                type: string
 *              phone:
 *                type: string
 *     responses:
 *       200:
 *         description: Branch ID ${id} Updated
 *      404:
 *        description: Branch ID ${id} Not Found
 *      500:
 *        description: Error Updating Branch
 */
router.put("/:id", branchController.updateBranch)

/**
 * @description Delete Branch.
 * @route DELETE v1/branch/:id
 * 
 * @openapi
 * /api/v1/branch/{id}:
 *   delete:
 *     summary: Delete branch
 *     tags: [branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the branch to delete
 *     responses:
 *       200:
 *         description: Branch ID ${id} Deleted
 *       404:
 *         description: Branch ID ${id} Not Found
 *       500:
 *         description: Error Deleting Branch
 */
router.delete("/:id", branchController.deleteBranch)

export default router;
