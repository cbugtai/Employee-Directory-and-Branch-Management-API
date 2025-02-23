import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

const serviceAccountJSON = process.env.FIREBASE_KEY;

if (!serviceAccountJSON){
    throw new Error("FIREBASE_KEY env var is not met")
}
const serviceAccount: ServiceAccount = JSON.parse(serviceAccountJSON)

initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();

export default db;