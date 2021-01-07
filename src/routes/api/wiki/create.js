import { createWikiPage } from "@services/wikis.js";

const ERRORS = {
  NO_DATA: "No data was sent."
};

export async function post(req, res, next) {


  if (!req.user) {
    return next();
  }

  const wikiData = req.body || null;

  if (!wikiData) {
    return res.end(ERRORS.NO_DATA);
  }

  try {
    const id = await createWikiPage(wikiData);
    return res.json(id);
  }
  catch (err) {
    res.end(err.message);
  }

}