import { firestore, firestoreFields } from "@services/firebase.js";
import { uuid } from "@utils";

const FieldValue = firestoreFields.FieldValue;
const timestamp = () => FieldValue.serverTimestamp();


const wikiRef = firestore.collection("wiki");
const wikiSettingsRef = firestore.collection("wikiSettings");

export async function getWikiSettings() {
  const doc = await wikiSettingsRef.doc("topics").get();

  if (doc.exists) {
    return doc.data();
  }

  return Object.create(null);
}

/**
 *
 * @param {string} slug The identifier of the wiki page
 */
export async function pageExists(slug) {
  const document = await wikiRef
    .where("slug", "==", slug)
    .get();

  return !document.empty;
}

/**
 *
 * @param {string} id The identifier of the wiki page
 */
export async function getByID(id) {
  const document = await wikiRef
    .doc(id)
    .get();

  return document.data();
}

export async function listAllWikiPages() {
  const snapshot = await wikiRef.get();
  return snapshot.docs.map(doc => doc.data());
}

export async function createWikiPage(wikiData) {

  const page = Object.assign(_createWikiPage(), wikiData);

  const ref = await wikiRef.doc(page.id).set(page);

  return page.id;
}

/**
 *
 * @param {Wiki} wiki The data that should be saved
 */
export async function updateWikiPage(wiki) {

  wiki.lastModified = timestamp();
  return await wikiRef.doc(wiki.id).update(wiki);
}


/**
 * Creates and returns a new guide based on the necessary fields
 */
function _createWikiPage() {

  const createdAt = timestamp();

  return {
    id: uuid(),
    createdAt,
    lastModified: createdAt,
    title: "",
    slug: "",
    content: "",
    isPublished: false,
  };
}