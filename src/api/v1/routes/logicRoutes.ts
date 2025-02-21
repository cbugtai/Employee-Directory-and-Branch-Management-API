import express, { Router } from "express";
import * as logicController from "../controllers/logicController";

const router: Router = express.Router();

// "${URL}/api/v1/employees"

/**
 * @description Get All Employees for a Branch
 * @route GET v1/employees/branch/:branchID
 * 
 * @openai
 * /api/v1/employees/branch/{branchID}:
 *  get:
 *    summary: Get employees by Branch
 *    tags: [employee]
 *    parameters:
 *       - in: path
 *         name: branchID
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the branch of the employees to retrieve
 *    responses:
 *      200:
 *        description: Employees in Branch ID ${branchID} Retrieved
 *      404:
 *        description: Branch ID ${branchID} Not Found
 *      500:
 *        description: Error Retrieving Employees.
 */
router.get("/branch/:branchID", logicController.getBranchEmployees)

/**
 * @description Get All Employees by Department
 * @route GET v1/employees//department/:department
 * 
 * @openai
 * /api/v1/employees/department/{department}:
 *  get:
 *    summary: Get employee by Department
 *    tags: [employee]
 *    parameters:
 *       - in: path
 *         name: department
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the branch of the employees to retrieve
 *    responses:
 *      200:
 *        description: Employees in ${department} Department Retrieved
 *      404:
 *        description: ${department} Department Not Found
 *      500:
 *        description: Error Retrieving Employees
 */
router.get("/department/:department", logicController.getDepartmentEmployees)


export default router;
