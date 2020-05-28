import { getSettings } from "../../services/settings.js";


/**
 * Retrieves all whitelisted users
 * @method GET
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function get(req, res, next) {

}

/**
 * Update the list of whitelisted users
 * @method POST
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function post(req, res, next) {

  return res.json();
}
