import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

const router: Router = express.Router();

// "URL:/api/v1/"

//Create Branch
router.post("/branch", branchController.createBranch)
//Get All Branches
router.get("/branch", branchController.getAllBranches)
//GEt Branch By ID
router.get("/branch/:id", branchController.getBranch)
//Update Branch
router.put("/branch/:id", branchController.updateBranch)
//Delete Branch
router.delete("/branch/:id", branchController.deleteBranch)

export default router;
