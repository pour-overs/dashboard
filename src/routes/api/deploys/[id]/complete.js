import { setDeployComplete, getByID } from "@services/deploys.js";

const ERRORS = {
  INVALID_ID: "The deploy associated with that ID was not found.",
  NO_DATA: "No data was sent."
};

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function post(req, res, next) {

  const { id: deployID } = req.params;
  const isComplete = req.query.isComplete === "true";

  if (!deployID) {
    return res.end(ERRORS.INVALID_ID);
  }

  if (typeof isComplete === "undefined") {
    return res.end(ERRORS.NO_DATA);
  }

  await setDeployComplete(deployID, { isComplete, });
  const deployData = await getByID(deployID);

  return res.json(deployData);
}