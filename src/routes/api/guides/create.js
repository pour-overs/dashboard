import { createGuide } from "@services/guides.js";

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function post(req, res, next) {

  if (!req.user) {
    return next();
  }

  const createdId = await createGuide(req.user.uid);

  res.json({ createdId });
}