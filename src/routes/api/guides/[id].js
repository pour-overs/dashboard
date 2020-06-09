import { getByID } from "../../../services/guides.js";


/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function get(req, res, next) {

  const guideId = req.params.id

  if (guideId) {
    const guide = await getByID(guideId);
    return res.json(guide);
  }

  res.end("Missing ID");
}


/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function post(req, res, next) {
  res.json();
}