import express, { request, Response, Express } from "express";
import morgan from "morgan";

const app: Express = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.get("/api/v1/items", (req, res) => {
    res.json({ message: "Get all items" });
});

const PORT: string | 3000 = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;