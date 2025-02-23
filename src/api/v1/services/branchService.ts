import { Branch } from "../models/branchModel";
import * as firebase from "../repositories/firestoreRepository"
import { DocumentData } from "node_modules/firebase-admin/lib/firestore";
import { ServiceError } from "../errors/errors";

const COLLECTION: string = "branches";

/**
 * @description Adds new Branch
 * @param {Partial<Branch>} newBranchData - branch information, must include Branch name, Address and Phone Number 
 * @returns {Promise<Branch>} The new Branch with generated ID
 */
export const createBranch = async (newBranchData: Partial<Branch>): Promise<Branch> => {
    const id: string = await firebase.createDocument(COLLECTION, newBranchData);

    return { id, ...newBranchData } as Branch;
}

/**
 * @description Get All Branches
 * @returns {promise<Branch[]>} List of all Branches 
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await firebase.getDocuments(COLLECTION);

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Branch
    });
}

/**
 * @description Get Branch by ID
 * @param {string} id - id of the Branch
 * @throws {Error} - error when branch id doesnt exist
 * @returns {Branch} - returns Branch Data of given branch id 
 */
export const getBranch = async (id: string): Promise<Branch> => {
    const snapshot: FirebaseFirestore.DocumentSnapshot = await firebase.getDocumentById(COLLECTION, id);

    const data: DocumentData | undefined = snapshot.data();
    if (data) {
        return { id: snapshot.id, ...data } as Branch
    } else {
        throw new ServiceError("Id Not Found", "DOCUMENT_NOT_FOUND", 404);
    }
}

/**
 * @description Updates Existing Branch Data
 * @param {string} id - id of the branch to be updated
 * @param {Partial<Branch>} updatedData - object with updated Branch Data
 * @throws {Error} - error when branch id doesnt exist
 * @returns {Branch} - the updated Branch Data
 */
export const updateBranch = async (id: string, updatedData: Partial<Branch>): Promise<Branch> => {
    await firebase.updateDocument(COLLECTION, id, updatedData);
    return { id, ...updatedData } as Branch;
}

/**
 * @description Delets a Branch
 * @param {String} id - id of the Branch to be deleted.
 * @throws {Error} - error when branch id doesnt exist
 * @returns {Promise<void>}
 */
export const deleteBranch = async (id: string): Promise<void> => {
    await firebase.deleteDocument(COLLECTION, id)
}