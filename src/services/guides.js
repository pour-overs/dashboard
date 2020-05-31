import { firestore, firestoreFields } from "./firebase.js";

const FieldValue = firestoreFields.FieldValue;
const timestamp = () => FieldValue.serverTimestamp();


const guidesRef = firestore.collection("guides");


export async function listGuides() {

}


/**
 * Create a new guide
 * @returns {Promise>string>} A promise that resolves to the newly created Guide ID
 */
export async function createGuide(userId) {

  const createdAt = timestamp();

  const ref = await guidesRef.add({
    createdAt,
    lastModified: createdAt,
    owner: userId,
    title: "New Guide",
  })

  return ref.id;
}


/**
 *
 * @param {string} guideID The id of a Guide
 */
export async function deleteGuide(guideID) {

}


/**
 * Fetches a single guide by ID
 * @param {string} guideID The id of a Guide
 */
export async function getByID(guideID) {

}

