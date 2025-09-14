import { cert, getApps, initializeApp, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID || "",
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined,
};

const app =
  getApps().length === 0 ? initializeApp({ credential: cert(serviceAccount) }) : getApps()[0];

export const adminAuth = getAuth(app);
export const db = getFirestore(app);
