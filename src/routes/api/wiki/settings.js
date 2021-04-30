import { getWikiSettings } from "@services/wikis.js";

export async function get(req, res) {

  const settings = await getWikiSettings();

  res.json(settings);
}