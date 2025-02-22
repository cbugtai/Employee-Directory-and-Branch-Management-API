import express, { Request, Response, Express } from "express";
import morgan from "morgan";

import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes"
import logicRoutes from "./api/v1/routes/logicRoutes"

const app: Express = express();
app.use(express.json());

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

//Mount the Branch routes on /api/v1/
app.use("/api/v1/branch", branchRoutes);

//Mount the employee routes on /api/v1/
app.use("/api/v1/employees", employeeRoutes);

//Mount the Logical Operations on /api/v1/employees
app.use("/api/v1/employees", logicRoutes);

//Default error handler for unmatched routes
app.use((req: Request, res: Response): void => {
    res.status(404).json({ message: "Endpoint not found" });
});



export default app;