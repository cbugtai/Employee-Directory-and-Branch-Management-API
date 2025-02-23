import express, { Request, Response, Express } from "express";
import morgan from "morgan";

import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes"
import logicRoutes from "./api/v1/routes/logicRoutes"
import setupSwagger from "../config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler";

const app: Express = express();

//API Documentation
setupSwagger(app);

//Middleware
app.use(morgan("combined"));
app.use(express.json());

/**
 * Server Health Check Endpoint
 * 
 * @openapi
 * /api/v1/health:
 *  get:
 *   summary: Get health status of the application
 *   tags: [Health]
 *   responses:
 *    200:
 *     description: The application's status, uptime, the current timestamp, and version
 */
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

//Routes
app.use("/api/v1/branch", branchRoutes);
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/employees", logicRoutes);

//Error handling
app.use(errorHandler)

export default app;