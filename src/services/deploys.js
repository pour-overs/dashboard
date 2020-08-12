import { firestore, firestoreFields } from "./firebase.js";

const FieldValue = firestoreFields.FieldValue;
const timestamp = () => FieldValue.serverTimestamp();


const deploysRef = firestore.collection("guides");

/**
 * Create a new deploy and associate to the userId
 * @returns {Promise<string>} A promise that resolves to the newly created Deploy ID
 */
export async function createDeploy(userId) {

  const guide = _createDeploy(userId);

  const ref = await deploysRef.add(guide);

  return ref.id;
}


function _createDeploy(userId) {

  const createdAt = timestamp();

  return {
    createdAt,
    lastModified: createdAt,
    initiatedBy: userId,
    label: "",
    isComplete: false,
  }
}
