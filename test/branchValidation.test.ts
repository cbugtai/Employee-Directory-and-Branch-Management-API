import { Request, Response, NextFunction } from "express";
import { validate, validateRequest } from "../src/api/v1/middleware/validate";
import { branchSchema, branchIdSchema } from "../src/api/v1/validations/branchValidation";

interface Branch{
    id?: string,         
    name: string,       
    address: string,    
    phone: string,      
}

interface BranchId{
    id: string
}

describe("Validate schema for Branches", () => {
    it("should not throw and error for valid branch data", () => {
        const data: Branch = {
            name: "Test Name",
            address: "Test Address",
            phone: "(123) 123 - 1234"
        }

        expect(() => validate(branchSchema, data)).not.toThrow();
    })

    it("should not throw an error for valid branch data with optional fields", () => {
        const data: Branch = {
            id: "123",
            name: "Test Name",
            address: "Test Address",
            phone: "(123) 123 - 1234"
        };

        expect(() => validate(branchSchema, data)).not.toThrow();
    });

    it("should throw an error for missing name", () => {
        const data: Partial<Branch> = {
            address: "Test Address",
            phone: "(123) 123 - 1234"
        }

        expect(() => validate(branchSchema, data)).toThrow(
            "Validation error: Name is required"
        )
    })

    it("should throw an error for empty name", () => {
        const data: Branch = {
            name: "",
            address: "Test Address",
            phone: "(123) 123 - 1234"
        }

        expect(() => validate(branchSchema, data)).toThrow(
            "Validation error: Name cannot be empty"
        )
    })

    it("should throw an error for missing address", () => {
        const data: Partial<Branch> = {
            name: "Test Name",
            phone: "(123) 123 - 1234"
        }

        expect(() => validate(branchSchema, data)).toThrow(
            "Validation error: Address is required"
        )
    })

    it("should throw an error for empty address", () => {
        const data: Branch = {
            name: "Test Name",
            address: "",
            phone: "(123) 123 - 1234"
        }

        expect(() => validate(branchSchema, data)).toThrow(
            "Validation error: Address cannot be empty"
        )
    })

    it("should throw an error for missing phone number", () => {
        const data: Partial<Branch> = {
            name: "Test Name",
            address: "Test Address"
        }

        expect(() => validate(branchSchema, data)).toThrow(
            "Validation error: Phone number is required"
        )
    })

    it("should throw an error for empty phone number", () => {
        const data: Branch = {
            name: "Test Name",
            address: "Test Address",
            phone: ""
        }

        expect(() => validate(branchSchema, data)).toThrow(
            "Validation error: Phone number cannot be empty"
        )
    })

    it("should throw an error for phone number with invalid format", () => {
        const data: Branch = {
            name: "Test Name",
            address: "Test Address",
            phone: "(abc) 123 - 1234"
        }

        expect(() => validate(branchSchema, data)).toThrow(
            "Validation error: Phone number format is invalid; only digits, spaces, dashes or parentheses allowed"
        )
    })
})

describe("Validate schema for BranchID", () => {
    it("should not throw and error for valid Branch ID", () => {
        const data: BranchId = {
            id: "1"
        }

        expect(() => validate(branchIdSchema, data)).not.toThrow();
    })

    it("should throw and error for missing Branch ID", () => {
        const data: Partial<BranchId> = {
            
        }

        expect(() => validate(branchIdSchema, data)).toThrow(
            "Validation error: Branch Id is required"
        )
    })
    
    it("should throw and error for empty Branch ID", () => {
        const data: Partial<BranchId> = {
            id: ""
        }

        expect(() => validate(branchIdSchema, data)).toThrow(
            "Validation error: Branch Id cannot be empty."
        )
    })

    it("should throw and error for non-numerical Branch ID", () => {
        const data: Partial<BranchId> = {
            id: "a"
        }

        expect(() => validate(branchIdSchema, data)).toThrow(
            "Validation error: Branch Id must be a number"
        )
    })
})

describe("validateRequest middleware for branches body", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it("should call next for valid branch data", () => {
        req.body = {
            name: "Test Name",
            address: "Test Address",
            phone: "(123) 123 - 1234"
        };

        validateRequest(branchSchema, "body")(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("should return an error for missing name", () => {
        req.body = {
            
            address: "Test Address",
            phone: "(123) 123 - 1234"
        };

        validateRequest(branchSchema, "body")(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: Name is required"
        });
    });

    it("should call return an error for empty name", () => {
        req.body = {
            name: "",
            address: "Test Address",
            phone: "(123) 123 - 1234"
        }

        validateRequest(branchSchema, "body")(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: Name cannot be empty."
        })
    })

    it("should return an error for missing address", () => {
        req.body = {
            name: "Test Name",
            
            phone: "(123) 123 - 1234"
        };

        validateRequest(branchSchema, "body")(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: Address is required"
        });
    });

    it("should call return an error for empty address", () => {
        req.body = {
            name: "Test Name",
            address: "",
            phone: "(123) 123 - 1234"
        }

        validateRequest(branchSchema, "body")(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: Address cannot be empty."
        })
    })

    it("should return an error for missing phone number", () => {
        req.body = {
            name: "Test Name",
            address: "Test Address"
        };

        validateRequest(branchSchema, "body")(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: Phone number is required"
        });
    });

    it("should return an error for empty phone number", () => {
        req.body = {
            name: "Test Name",
            address: "Test Address",
            phone: ""
        };

        validateRequest(branchSchema, "body")(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: Phone number cannot be empty."
        });
    });

    it("should return an error for invalid phone number", () => {
        req.body = {
            name: "Test Name",
            address: "Test Address",
            phone: "(abc) 123 - 1234"
        };

        validateRequest(branchSchema, "body")(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: Phone number format is invalid; only digits, spaces, dashes or parentheses allowed"
        });
    });
})

describe("validateRequest middleware for Branch Id parameter", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it("should call next for valid branch id parameter", () => {
        req.params = {
            id: "1"
        };

        validateRequest(branchIdSchema, "params")(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("should return an error for missing Branch Id", () => {
        req.params = {
            
        };

        validateRequest(branchIdSchema, "params")(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: Branch Id is required"
        });
    });

    it("should return an error for empty Branch Id", () => {
        req.params = {
            id: ""
        };

        validateRequest(branchIdSchema, "params")(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: Branch Id cannot be empty."
        });
    });

    it("should return an error for non-numeric Branch Id", () => {
        req.params = {
            id: "a"
        };

        validateRequest(branchIdSchema, "params")(req as Request, res as Response, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Validation error: Branch Id must be a number"
        });
    });
})