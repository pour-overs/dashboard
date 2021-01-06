import { firestore, firestoreFields } from "@services/firebase.js";

const FieldValue = firestoreFields.FieldValue;
const timestamp = () => FieldValue.serverTimestamp();


const wikiRef = firestore.collection("wiki");

/**
 *
 * @param {string} slug The identifier of the wiki page
 */
export async function pageExists(slug) {
  const document = await wikiRef
    .doc(slug)
    .get();

  return document.exists;
}

/**
 *
 * @param {string} slug The identifier of the wiki page
 */
export async function getBySlug(slug) {
  const document = await wikiRef
    .doc(slug)
    .get();

  return document.data();
}

export async function listAllWikiPages() {
  const snapshot = await wikiRef.get();
  return snapshot.docs.map(doc => doc.data());
}

export async function createWikiPage(wikiData) {

  const page = Object.assign(_createWikiPage(), wikiData);

  await wikiRef
    .doc(page.slug)
    .set(page);

  return page;
}

export async function updateWikiPage() {

}


/**
 * Creates and returns a new guide based on the necessary fields
 */
function _createWikiPage() {

  const createdAt = timestamp();

  return {
    createdAt,
    lastModified: createdAt,
    title: "",
    slug: "",
    content: "",
    isPublished: false,
  };
}