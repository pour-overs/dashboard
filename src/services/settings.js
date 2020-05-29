import { firestore } from "./firebase.js";

const settingsRef = firestore.collection("dashboard-settings").doc("global")

/**
 * Retrieves the document representing global settings
 * @returns {any} The document at /dashboard-settings/global
 */
export async function getSettings() {
  const errorMessage = "A problem occured when fetching /dashboard-settings/global";
  const settings = await settingsRef.get()
    .then((document) => {

      if (document.exists) {
        return Promise.resolve(document.data());
      }

      return Promise.resolve(null);
    })
    .catch(err => {
      console.log(err);
      return Promise.resolve(null)
    })

  if (settings === null) {
    console.log(errorMessage);
  }

  return settings;
}

/**
 * Sets the list of whitelisted users to the parameter `users`
 * @param {string[]} users A list of string email addresses
 */
export function setWhitelist(users = []) {
  return settingsRef.update({ whitelist: users, });
}