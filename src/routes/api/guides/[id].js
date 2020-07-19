import { getByID, updateGuide } from "../../../services/guides.js";

const ERRORS = {
  INVALID_ID: "The guide associated with that ID was not found.",
  NO_DATA: "No guide data was sent."
};

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

  res.end(ERRORS.INVALID_ID);
}


/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function post(req, res, next) {

  const guideId = req.params.id;

  if (!guideId) {
    return res.end(ERRORS.INVALID_ID);
  }

  const data = req.body;

  if (!data) {
    return res.end(ERRORS.NO_DATA);
  }

  const writeResult = await updateGuide(guideId, data);

  return res.json(writeResult);
}