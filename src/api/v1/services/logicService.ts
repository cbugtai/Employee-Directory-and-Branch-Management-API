import { Employee } from "../models/employeeModel";
import * as firebase from "../repositories/firestoreRepository";

/**
 * @description Get All Employees for a given Branch
 * @param {string} branchID - Id of the branch
 * @returns {Promise<Employee[]>} - list of employees in in the given branch
 * @throws {Error} when list is empty
 */
export const getBranchEmployees = async (branchID: string): Promise<Employee[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await firebase.getDocumentsByFieldValue("employees", "branchID", branchID);

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Employee
    });
}

/**
 * @description Get all employees for a given department
 * @param {string} department - department name 
 * @returns {Promise<Employee[]>} - list of employees in the given department
 * @throws {Error} when list is empty
 */
export const getDepartmentEmployees = async (department: string): Promise<Employee[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await firebase.getDocumentsByFieldValue("employees", "department", department);

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Employee
    });
}