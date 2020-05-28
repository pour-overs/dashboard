import { auth } from "../../services/firebase.js";

/**
 * Fetches a list of `count` users, paged by paramter nextPageToken
 * @param {string|null} [nextPageToken=null] A token indicating the next page to be fetched
 * @returns {ListUsersResult} A result-object containing keys for `.users` and `.pageToken`
 * @see https://firebase.google.com/docs/reference/admin/node/admin.auth.ListUsersResult
 */
function _listUsers(nextPageToken = undefined, count = 100) {
  return auth.listUsers(count, nextPageToken)
    .catch(function(error) {
      console.log('Error listing users:', error);
      return Promise.resolve(null);
    });
}


export async function get(req, res, next) {
  const { page } = req.params;

  const { users, pageToken } = await _listUsers(page);
  res.json({ pageToken, users });
}