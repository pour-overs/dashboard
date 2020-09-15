import { createDeploy } from "@services/deploys.js";

const ERRORS = {
  NO_DATA: "A label is required."
};

export async function post(req, res, next) {

  if (!req.user) {
    return next();
  }

  const data = req.body;

  if (!data || !data.target) {
    return res.end(ERRORS.NO_DATA);
  }

  const createdId = await createDeploy(req.user.uid, data.target, data.branchName);

  res.json({ createdId });
}