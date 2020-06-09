import { listGuides } from "../../../services/guides.js";


/**
 * Fetches the list of guides for the current user,
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function get(req, res, next) {
  const guides = await listGuides(req.user.uid);
  res.json(guides);
}