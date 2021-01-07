import { getByID, updateWikiPage } from "@services/wikis.js";

const ERRORS = {
  INVALID_ID: "Invalid ID",
  NO_DATA: "No wiki data was sent."
}

/**
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function get(req, res, next) {
  const id = req.params.id;
  const document = await getByID(id);
  return res.json(document);
}

/**
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export async function post(req, res, next) {
  const { id } = req.params;
  const wiki = req.body;

  if (!id) {
    return res.end(ERRORS.INVALID_ID);
  }

  if (!wiki) {
    return res.end(ERRORS.NO_DATA);
  }

  try {
    await updateWikiPage(wiki);
  }
  catch (err) {
    res.end(err.message);
  }

  return res.json();
}