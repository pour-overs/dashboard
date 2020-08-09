import { auth } from "@services/firebase.js";

/**
 * Fetches a list of `count` users, paged by paramter nextPageToken
 * @param {string|null} [nextPageToken=null] A token indicating the next page to be fetched
 * @returns {ListUsersResult} A result-object containing keys for `.users` and `.pageToken`
 * @see https://firebase.google.com/docs/reference/admin/node/admin.auth.ListUsersResult
 */
function _listUsers(nextPageToken = undefined, count = 1000) {
  return auth.listUsers(count, nextPageToken)
    .catch(function(error) {
      console.log('Error listing users:', error);
      return Promise.resolve(null);
    });
}


/**
 * @method GET
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function get(req, res, next) {
  const { page } = req.query;
  const { users, pageToken } = await _listUsers(page ? page : undefined);
  res.json({ pageToken, users });
}
