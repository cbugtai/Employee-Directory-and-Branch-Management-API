import express, { Request, Response, Express } from "express";
import morgan from "morgan";

import employeeRoutes from "./api/v1/routes/employeeRoutes";

const app: Express = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

/**
 * Mount the employee routes on /api/v1
 */
app.use("/api/v1/employees", employeeRoutes);

/**
 * Default error handler for unmatched routes
 */
app.use((req: Request, res: Response): void => {
    res.status(404).json({ message: "Endpoint not found" });
});

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

export default app;