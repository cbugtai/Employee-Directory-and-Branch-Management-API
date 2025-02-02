import request, { Response } from "supertest";
import app from "../src/app";

describe("GET /api/v1/health", () => {
    it("should return 200 OK", async () => {
        const response: Response = await request(app).get("/api/v1/health");

        const today = new Date().toISOString().slice(0,13)

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
        expect(response.body.timestamp).toMatch(`${today}`);
        expect(response.body.uptime).toBeGreaterThan(0.1);
        expect(response.body.version).toBe("1.0.0");
    });
});