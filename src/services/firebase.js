import * as admin from 'firebase-admin';

const databaseURL = "https://pour-over-guides.firebaseio.com";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL,
});


export const auth = admin.auth();

export const firestore = admin.firestore();

export const storage = admin.storage();

export const database = admin.database();



