import { listAllWikiPages } from "@services/wikis.js";


export async function get(req, res, next) {
  const wikis = await listAllWikiPages();
  return res.json(wikis);
}

