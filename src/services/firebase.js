import * as admin from 'firebase-admin';
import { firebaseConfig } from "@config/firebase.config";
const { databaseURL } = firebaseConfig;

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL,
});


export const auth = admin.auth();

export const firestore = admin.firestore();
export const firestoreFields = admin.firestore;

export const storage = admin.storage();

export const database = admin.database();



