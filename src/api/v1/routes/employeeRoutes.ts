import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router: Router = express.Router();

// app.use("/api/v1/", employeeRoutes);

//Create Employee
router.post("/employees", employeeController.createEmployee)
//Get All Employees
router.get("/employees", employeeController.getAllEmployees)
//Get Employee by ID
router.get("/employees/:id", employeeController.getEmployee)
//Update Employee
router.put("/employees/:id", employeeController.updateEmployee)
//Delete Employee
router.delete("/employees/:id", employeeController.deleteEmployee)

export default router;