import { getSettings, setWhitelist } from "@services/settings.js";


/**
 * Retrieves all whitelisted users
 * @method GET
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function get(req, res, next) {
  const { whitelist, useWhitelist } = await getSettings();
  return res.json(whitelist || []);
}

/**
 * Update the list of whitelisted users
 * @method POST
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function post(req, res, next) {
  const users = req.body;
  await setWhitelist(users);
  return res.json(users);
}
