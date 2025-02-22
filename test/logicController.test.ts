import type { Request, Response, NextFunction } from "express";
import * as logicService from '../src/api/v1/services/logicService';
import * as logicController from '../src/api/v1/controllers/logicController';
import { HTTP_STATUS } from '../src/constants/httpConstants';

jest.mock("../src/api/v1/services/logicService")

describe('Logic Controller Test', () => {
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

    describe('getBranchEmployees Test', () => {
        it('should return employees for a given branch', async () => {
            const mockEmployees = [
                { id: '1', name: 'John Doe', position: 'Developer', department: 'Engineering', email: 'john.doe@example.com', phone: '123-456-7890', branchID: '101' },
                { id: '2', name: 'Jane Smith', position: 'Manager', department: 'Sales', email: 'jane.smith@example.com', phone: '987-654-3210', branchID: '101' }
            ];
            mockReq.params = { branchID: '101' };
            (logicService.getBranchEmployees as jest.Mock).mockReturnValue(mockEmployees);

            await logicController.getBranchEmployees(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: `Employees in Branch ID 101 Retrieved`,
                data: mockEmployees,
                status: "success"
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should call next if an error occurs', async () => {
            const error = new Error('Test Error');
            mockReq.params = { branchID: '101' };
            (logicService.getBranchEmployees as jest.Mock).mockImplementation(() => { throw error; });

            await logicController.getBranchEmployees(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getDepartmentEmployees Test', () => {
        it('should return employees for a given department', async () => {
            const mockEmployees = [
                { id: '3', name: 'Alice Johnson', position: 'Analyst', department: 'Finance', email: 'alice.johnson@example.com', phone: '555-666-7777', branchID: '102' }
            ];
            mockReq.params = { department: 'Finance' };
            (logicService.getDepartmentEmployees as jest.Mock).mockReturnValue(mockEmployees);

            await logicController.getDepartmentEmployees(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: `Employees in Finance Department Retrieved`,
                data: mockEmployees,
                status: "success"
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should call next if an error occurs', async () => {
            const error = new Error('Test Error');
            mockReq.params = { department: 'Finance' };
            (logicService.getDepartmentEmployees as jest.Mock).mockImplementation(() => { throw error; });

            await logicController.getDepartmentEmployees(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
})