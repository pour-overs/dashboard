import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { firebaseConfig } from "@config/firebase.config";


export { firebase };
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();


