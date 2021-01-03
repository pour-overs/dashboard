import { firestore, firestoreFields } from "@services/firebase.js";

const FieldValue = firestoreFields.FieldValue;
const timestamp = () => FieldValue.serverTimestamp();


const wikiRef = firestore.collection("wiki");

export async function getByID() {

}

export async function listWikis() {

}

export async function createWikiPage() {

}

export async function updateWikiPage() {

}
