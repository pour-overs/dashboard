import { listGuidesByUser, listGuides } from "@services/guides.js";


/**
 * Fetches the list of guides for the current user,
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function get(req, res, next) {
  if ("showAll" in req.query) {
    const guides = await listGuides();
    res.json(guides);
  }
  else {
    const guides = await listGuidesByUser(req.user.uid);
    res.json(guides);
  }
}