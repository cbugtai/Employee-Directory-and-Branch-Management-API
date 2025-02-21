import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router: Router = express.Router();

// "URL/api/v1/employees"

/**
 * @description Create Employee.
 * @route POST v1/employees/
 * 
 * @openai
 * /api/v1/employees/:
 *  post:
 *    description: Create New employee
 *    tags: [employee]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              position:
 *                type: string
 *              department:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: string
 *              branchID:
 *                type: string
 *    responses:
 *      200:
 *        description: Employee added
 *      500:
 *        description: Error adding employee
 */
router.post("/", employeeController.createEmployee)

/**
 * @description Get All Employees.
 * @route GET v1/employees/
 * 
 * @openai
 * /api/v1/employees/:
 *  get:
 *    summary: Get a list all employees
 *    tags: [employee]
 *    responses:
 *      200:
 *        description: Employeees Retrieved.
 *      500:
 *        description: Error Retrieving Employees.
 * 
 */
router.get("/", employeeController.getAllEmployees)

/**
 * @description Get employee By ID.
 * @route GET v1/employees/:id
 * 
 * @openai
 * /api/v1/employees/{id}:
 *  get:
 *    summary: Get employee by ID
 *    tags: [employee]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to retrive
 *    responses:
 *      200:
 *        description: Employee ID ${id} Retrieved.
 *      404:
 *        description: Employee ID ${id} Not Found
 *      500:
 *        description: Error Retrieving Employee.
 */
router.get("/:id", employeeController.getEmployee)

/**
 * @description Update employee.
 * @route PUT v1/employees/:id
 * 
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update existing employe data
 *     tags: [employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to be updated
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              position:
 *                type: string
 *              department:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: string
 *              branchID:
 *                type: string
 *     responses:
 *       200:
 *         description: Employee ID ${id} Updated
 *      404:
 *        description: Employee ID ${id} Not Found
 *      500:
 *        description: Error Updating Employee
 */
router.put("/:id", employeeController.updateEmployee)

/**
 * @description Delete employee.
 * @route DELETE v1/employees/:id
 * 
 * @openapi
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete Employee
 *     tags: [employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to delete
 *     responses:
 *       200:
 *         description: Employee ID ${id} Deleted
 *       404:
 *         description: Employee ID ${id} Not Found
 *       500:
 *         description: Error Deleting Employee
 */
router.delete("/:id", employeeController.deleteEmployee)

export default router;
