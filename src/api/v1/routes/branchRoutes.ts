import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

const router: Router = express.Router();

// "URL:/api/v1/"

//Create Branch
router.post("/", branchController.createBranch)
//Get All Branches
router.get("/", branchController.getAllBranches)
//GEt Branch By ID
router.get("/:id", branchController.getBranch)
//Update Branch
router.put("/:id", branchController.updateBranch)
//Delete Branch
router.delete("/:id", branchController.deleteBranch)

export default router;
