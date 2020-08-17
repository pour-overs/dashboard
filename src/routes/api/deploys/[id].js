import { getByID, updateDeploy } from "@services/deploys.js";

const ERRORS = {
  INVALID_ID: "The deploy associated with that ID was not found.",
  NO_DATA: "No deploy data was sent."
};

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function get(req, res, next) {

  const deployID = req.params.id;

  if (deployID) {
    const deployData = await getByID(deployID);
    return res.json(deployData);
  }

  res.end(ERRORS.INVALID_ID);
}


/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function post(req, res, next) {

  const deployID = req.params.id;

  if (!deployID) {
    return res.end(ERRORS.INVALID_ID);
  }

  const data = req.body;

  if (!data) {
    return res.end(ERRORS.NO_DATA);
  }

  const writeResult = await updateDeploy(deployID, data);

  return res.json(writeResult);
}