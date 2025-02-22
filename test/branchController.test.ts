import { Request, Response, NextFunction } from "express";
import * as branchService from "../src/api/v1/services/branchService";
import * as branchController from "../src/api/v1/controllers/branchController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { Branch } from "../src/api/v1/models/branchModel";

jest.mock("../src/api/v1/services/branchService")

describe("Branch Controller Tests", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn() 
        }
        mockNext = jest.fn();
    });

    describe("createBranch Test", () => {
        it("Should create a branch and return a 201 status", async () => {
            const mockBranch: Branch = { id: '1', name: 'Test Branch', address: '123 Test St', phone: '123-456-7890' };
            mockReq.body = { name: 'Test Branch', address: '123 Test St', phone: '123-456-7890' };
            (branchService.createBranch as jest.Mock).mockResolvedValue(mockBranch);

            await branchController.createBranch(mockReq as Request, mockRes as Response, mockNext)

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch Added",
                data: mockBranch,
                status: "success"
            })
            expect(mockNext).not.toHaveBeenCalled();
        })

        it("Should call next if an error occurs", async () => {
            const mockError = new Error("Test Error");
            (branchService.createBranch as jest.Mock).mockRejectedValue(mockError);

            await branchController.createBranch(mockReq as Request, mockRes as Response, mockNext)

            expect(mockNext).toHaveBeenCalledWith(mockError);
        })
    })

    describe("getAllBranches Test", () => {
        it("Should return all branches", async () => {
            const mockBranches: Branch[] = [
                { id: '1', name: 'Branch 1', address: '123 Main St', phone: '111-111-1111' },
                { id: '2', name: 'Branch 2', address: '456 Elm St', phone: '222-222-2222' },
            ];
            (branchService.getAllBranches as jest.Mock).mockResolvedValue(mockBranches);

            await branchController.getAllBranches(mockReq as Request, mockRes as Response, mockNext)

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branches Retrieved",
                data: mockBranches,
                status: "success"
            })
            expect(mockNext).not.toHaveBeenCalled();
        })

        it("Should call next if an error occurs", async () => {
            const mockError = new Error("Test Error");
            (branchService.getAllBranches as jest.Mock).mockRejectedValue(mockError);

            await branchController.getAllBranches(mockReq as Request, mockRes as Response, mockNext)

            expect(mockNext).toHaveBeenCalledWith(mockError);
        })
    })

    describe('getBranch', () => {
        it('should return a branch by ID', async () => {
            const mockBranch: Branch = { id: '1', name: 'Test Branch', address: '123 Test St', phone: '123-456-7890' };
            mockReq.params = { id: '1' };
            (branchService.getBranch as jest.Mock).mockResolvedValue(mockBranch);

            await branchController.getBranch(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch ID 1 Retrieved",
                data: mockBranch,
                status: "success"
            })
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should call next if an error occurs', async () => {
            const error = new Error('Test Error');
            mockReq.params = { id: '1' };
            (branchService.getBranch as jest.Mock).mockRejectedValue(error);

            await branchController.getBranch(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('updateBranch', () => {
        it('should update a branch and return updated data', async () => {
            const updatedBranch: Branch = { id: '1', name: 'Updated Branch', address: '789 Updated Ave', phone: '999-999-9999' };
            mockReq.params = { id: '1' };
            mockReq.body = { name: 'Updated Branch', address: '789 Updated Ave', phone: '999-999-9999' };
            (branchService.updateBranch as jest.Mock).mockResolvedValue(updatedBranch);

            await branchController.updateBranch(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: `Branch ID 1 Updated`,
                data: updatedBranch,
                status: "success"
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should call next if an error occurs', async () => {
            const error = new Error('Test Error');
            mockReq.params = { id: '1' };
            mockReq.body = { name: 'Updated Branch', address: '789 Updated Ave', phone: '999-999-9999' };
            (branchService.updateBranch as jest.Mock).mockRejectedValue(error);

            await branchController.updateBranch(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteBranch', () => {
        it('should delete a branch and return success message', async () => {
            mockReq.params = { id: '1' };
            (branchService.deleteBranch as jest.Mock).mockResolvedValue(true);

            await branchController.deleteBranch(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch ID 1 Deleted",
                status: "success"
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should call next if an error occurs', async () => {
            const error = new Error('Test Error');
            mockReq.params = { id: '1' };
            (branchService.deleteBranch as jest.Mock).mockRejectedValue(error);

            await branchController.deleteBranch(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});