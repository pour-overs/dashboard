import { firestore, firestoreFields } from "./firebase.js";

const FieldValue = firestoreFields.FieldValue;
const timestamp = () => FieldValue.serverTimestamp();


const deploysRef = firestore.collection("deploys");

/**
 * Create a new deploy and associate to the userId
 * @returns {Promise<string>} A promise that resolves to the newly created Deploy ID
 */
export async function createDeploy(userId, label) {

  const deployItem = _createDeploy(userId, label);

  const ref = await deploysRef.add(deployItem);

  return ref.id;
}

export async function listDeploys() {
  const snapshot = await deploysRef
    .orderBy('lastModified', 'desc')
    .get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map(doc => {
    const deploy = doc.data();
    return { id: doc.id, ...deploy };
  });
}



function _createDeploy(userId, label) {

  const createdAt = timestamp();

  return {
    createdAt,
    label,
    lastModified: createdAt,
    initiatedBy: userId,
    isComplete: false,
  }
}
