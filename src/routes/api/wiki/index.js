import { listAllWikiPages } from "@services/wikis.js";

const ERRORS = {
  NO_SLUG: "Missing 'slug' query",
}

export async function get(req, res, next) {
  const wikis = await listAllWikiPages();
  return res.json(wikis);
}


import { pageExists } from "@services/wikis.js";

/**
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function head(req, res, next) {
    
  const slug = req.query.slug || null;

    if (!slug) {
      return res.end(ERRORS.NO_SLUG);
    }

    const exists = await pageExists(slug);
  
    if (exists) {
      res.statusCode = 200;
    }
    else {
      res.statusCode = 404;
    }
  
    res.end();
  }