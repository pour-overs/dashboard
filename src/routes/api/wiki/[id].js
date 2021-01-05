import { getByID, pageExists, updateWikiPage } from "@services/wikis.js";

/**
 * 
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function head(req, res, next) {
  const id = req.params.id;
  const exists = await pageExists(id);

  if (exists) {
    res.statusCode = 200;
  }
  else {
    res.statusCode = 404;
  }

  res.end();
}

