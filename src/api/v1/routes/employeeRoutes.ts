import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router: Router = express.Router();

// "URL/api/v1/employees"

//Create Employee
router.post("/", employeeController.createEmployee)
//Get All Employees
router.get("/", employeeController.getAllEmployees)
//Get Employee by ID
router.get("/:id", employeeController.getEmployee)
//Update Employee
router.put("/:id", employeeController.updateEmployee)
//Delete Employee
router.delete("/:id", employeeController.deleteEmployee)

export default router;
