import { getBySlug, pageExists, updateWikiPage } from "@services/wikis.js";

/**
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function head(req, res, next) {
  const slug = req.params.slug;
  const exists = await pageExists(slug);

  if (exists) {
    res.statusCode = 200;
  }
  else {
    res.statusCode = 404;
  }

  res.end();
}

/**
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function get(req, res, next) {
  const slug = req.params.slug;
  const exists = await getBySlug(slug);
  return res.json(exists);
}
