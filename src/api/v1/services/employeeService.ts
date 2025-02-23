import { Employee } from "../models/employeeModel";
import * as firebase from "../repositories/firestoreRepository";
import { DocumentData } from "node_modules/firebase-admin/lib/firestore";
import { ServiceError } from "../errors/errors";

const COLLECTION: string = "employees";

/**
 * @description Adds new Employee
 * @param {Partial<Employee>} newEmployeeData - employee information, must include required fields
 * @returns {Promise<Employee>} The new Employee with generated ID
 */
export const addEmployee = async (newEmployeeData: Partial<Employee>): Promise<Employee> => {
    const id: string = await firebase.createDocument(COLLECTION, newEmployeeData);
    return { id, ...newEmployeeData } as Employee;
};

/**
 * @description Get All Employees
 * @returns {Promise<Employee[]>} List of all Employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await firebase.getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Employee;
    });
};

/**
 * @description Get Employee by ID
 * @param {string} id - id of the Employee
 * @throws {Error} - error when employee id doesn't exist
 * @returns {Promise<Employee>} - returns Employee Data of given employee id
 */
export const getEmployee = async (id: string): Promise<Employee> => {
    const snapshot: FirebaseFirestore.DocumentSnapshot = await firebase.getDocumentById(COLLECTION, id);
    const data: DocumentData | undefined = snapshot.data();

    if (data) {
        return { id: snapshot.id, ...data } as Employee;
    } else {
        throw new ServiceError(`Employee ID not found`, "DOCUMENT_NOT_FOUND", 404);
    }
};

/**
 * @description Updates Existing Employee Data
 * @param {string} id - id of the employee to be updated
 * @param {Partial<Employee>} updatedData - object with updated Employee Data
 * @throws {Error} - error when employee id doesn't exist
 * @returns {Promise<Employee>} - the updated Employee Data
 */
export const updateEmployee = async (id: string, updatedData: Partial<Employee>): Promise<Employee> => {
    await firebase.updateDocument(COLLECTION, id, updatedData);
    return { id, ...updatedData } as Employee;
};

/**
 * @description Deletes an Employee
 * @param {string} id - id of the Employee to be deleted
 * @throws {Error} - error when employee id doesn't exist
 * @returns {Promise<void>}
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    await firebase.deleteDocument(COLLECTION, id);
};
