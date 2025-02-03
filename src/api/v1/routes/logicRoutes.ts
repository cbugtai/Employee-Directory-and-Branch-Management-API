import express, { Router } from "express";
import * as logicController from "../controllers/logicController";

const router: Router = express.Router();

// "${URL}/api/v1/employees"

//Get All Employees for a Branch 
router.get("/branch", logicController.getBranchEmployees)
//Get All Employees by Department 
router.get("/department", logicController.getDepartmentEmployees)


export default router;
