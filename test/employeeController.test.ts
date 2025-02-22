import type { Request, Response, NextFunction } from "express";
import * as employeeService from '../src/api/v1/services/employeeService';
import * as employeeController from '../src/api/v1/controllers/employeeController';
import { HTTP_STATUS } from '../src/constants/httpConstants';
import { Employee } from '../src/api/v1/models/employeeModel';

jest.mock("../src/api/v1/services/employeeService")

describe("Employee Controller Tests", () => {
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

    describe('addEmployee Test', () => {
        it('should create an employee and return 201 status', async () => {
            const mockEmployee: Employee = {
                id: '1',
                name: 'John Doe',
                position: 'Developer',
                department: 'Engineering',
                email: 'john.doe@example.com',
                phone: '123-456-7890',
                branchID: '101'
            };
            mockReq.body = mockEmployee;
            (employeeService.addEmployee as jest.Mock).mockResolvedValue(mockEmployee);

            await employeeController.createEmployee(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Added",
                data: mockEmployee,
                status: "success"
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should call next if an error occurs', async () => {
            const error = new Error('Test Error');
            (employeeService.addEmployee as jest.Mock).mockRejectedValue(error);

            await employeeController.createEmployee(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getAllEmployees Test', () => {
        it('should return all employees', async () => {
            const mockEmployees: Employee[] = [
                {
                    id: '1',
                    name: 'John Doe',
                    position: 'Developer',
                    department: 'Engineering',
                    email: 'john.doe@example.com',
                    phone: '123-456-7890',
                    branchID: '101'
                },
                {
                    id: '2',
                    name: 'Jane Smith',
                    position: 'Manager',
                    department: 'Sales',
                    email: 'jane.smith@example.com',
                    phone: '987-654-3210',
                    branchID: '102'
                }
            ];
            (employeeService.getAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);

            await employeeController.getAllEmployees(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees Retrieved",
                data: mockEmployees,
                status: "success"
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should call next if an error occurs', async () => {
            const error = new Error('Test Error');
            (employeeService.getAllEmployees as jest.Mock).mockRejectedValue(error);

            await employeeController.getAllEmployees(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getEmployee Test', () => {
        it('should return an employee by ID', async () => {
            const mockEmployee: Employee = {
                id: '1',
                name: 'John Doe',
                position: 'Developer',
                department: 'Engineering',
                email: 'john.doe@example.com',
                phone: '123-456-7890',
                branchID: '101'
            };
            mockReq.params = { id: '1' };
            (employeeService.getEmployee as jest.Mock).mockResolvedValue(mockEmployee);

            await employeeController.getEmployee(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: `Employee ID 1 Retrieved`,
                data: mockEmployee,
                status: "success"
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should call next if an error occurs', async () => {
            const error = new Error('Test Error');
            mockReq.params = { id: '1' };
            (employeeService.getEmployee as jest.Mock).mockRejectedValue(error);

            await employeeController.getEmployee(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('updateEmployee Test', () => {
        it('should update an employee and return updated data', async () => {
            const updatedEmployee: Employee = {
                id: '1',
                name: 'John Doe Updated',
                position: 'Senior Developer',
                department: 'Engineering',
                email: 'john.updated@example.com',
                phone: '111-222-3333',
                branchID: '101'
            };
            mockReq.params = { id: '1' };
            mockReq.body = updatedEmployee;
            (employeeService.updateEmployee as jest.Mock).mockResolvedValue(updatedEmployee);

            await employeeController.updateEmployee(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: `Employee ID: 1, Updated`,
                data: updatedEmployee,
                status: "success"
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should call next if an error occurs', async () => {
            const error = new Error('Test Error');
            mockReq.params = { id: '1' };
            mockReq.body = {
                name: 'John Doe Updated',
                position: 'Senior Developer',
                department: 'Engineering',
                email: 'john.updated@example.com',
                phone: '111-222-3333',
                branchID: '101'
            };
            (employeeService.updateEmployee as jest.Mock).mockRejectedValue(error);

            await employeeController.updateEmployee(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteEmployee Test', () => {
        it('should delete an employee and return success message', async () => {
            mockReq.params = { id: '1' };
            (employeeService.deleteEmployee as jest.Mock).mockResolvedValue(true);

            await employeeController.deleteEmployee(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee ID: 1, Deleted",
                status: "success"
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should call next if an error occurs', async () => {
            const error = new Error('Test Error');
            mockReq.params = { id: '1' };
            (employeeService.deleteEmployee as jest.Mock).mockRejectedValue(error);

            await employeeController.deleteEmployee(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
})