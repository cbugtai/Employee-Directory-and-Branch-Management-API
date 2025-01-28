import express, { Router } from "express";
import * as itemController from "../controllers/itemController";

const router: Router = express.Router();

// app.use("/api/v1/employees", employeeRoutes);

router.get("/items", itemController.getAllitems);
router.post("/items", itemController.createItem);
router.put("/items/:id", itemController.updateItem);
router.delete("/items/:id", itemController.deleteItem);

export default router;