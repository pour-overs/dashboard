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
/**
 * Fetches a single Deploy by ID
 * @param {string} deployId The id of a Guide
 */
export async function getByID(deployId) {

  const document = await deploysRef
    .doc(deployId)
    .get();

  if (document.exists) {
    const data = { id: deployId, ...document.data(), };

    // convert these into datetime strings for parsing on the client
    data.lastModified.date = data.lastModified.toDate();
    data.createdAt.date = data.createdAt.toDate();

    return data;
  }
}

export async function updateDeploy() {
  // todo
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
