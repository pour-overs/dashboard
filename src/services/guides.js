import { firestore, firestoreFields } from "@services/firebase.js";

const FieldValue = firestoreFields.FieldValue;
const timestamp = () => FieldValue.serverTimestamp();


const guidesRef = firestore.collection("guides");


export async function listGuidesByUser(userId) {
  const snapshot = await guidesRef
    .orderBy('lastModified', 'desc')
    .where("owner", "==", userId)
    .get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map(doc => {
    const guide = doc.data();
    return { id: doc.id, ...guide };
  });
}

export async function listGuides() {
  const snapshot = await guidesRef
    .orderBy('lastModified', 'desc')
    .get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map(doc => {
    const guide = doc.data();
    return { id: doc.id, ...guide };
  });
}


/**
 * Create a new guide
 * @returns {Promise<string>} A promise that resolves to the newly created Guide ID
 */
export async function createGuide(userId) {

  const guide = _createGuide(userId);

  const ref = await guidesRef.add(guide);

  return ref.id;
}

/**
 * Update an existing Guide
 * @returns {Promise>string>} A promise that resolves to the newly created Guide ID
 */
export async function updateGuide(guideID, guideData) {

  const ref = guidesRef.doc(guideID);

  // update the lastModified field
  const data = Object.assign(guideData, { lastModified: timestamp(), });

  // save
  const res = await ref.update(data);

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
export async function getByID(guideId) {

  const document = await guidesRef
    .doc(guideId)
    .get();

  if (document.exists) {
    const data = { id: guideId, ...document.data(), };

    // convert these into datetime strings for parsing on the client
    data.lastModified.date = data.lastModified.toDate();
    data.createdAt.date = data.createdAt.toDate();

    return data;
  }
}



/**
 * Creates and returns a new guide based on the necessary fields
 */
function _createGuide(userId) {

  const createdAt = timestamp();

  return {
    createdAt,
    lastModified: createdAt,
    owner: userId,
    title: "",
    isPublished: false,
    introduction: {
      content: "",
      youtubeUrl: "",
      heroImg: "",
    },
    steps: [],
    coffee: {
      amount: 0,
      grind: "",
      device: ""
    }
  }
}