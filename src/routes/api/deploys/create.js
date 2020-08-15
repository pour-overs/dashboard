import { createDeploy } from "@services/deploys.js";

const ERRORS = {
  NO_DATA: "A label is required."
};

export async function post(req, res, next) {
  debugger;
  if (!req.user) {
    return next();
  }

  const data = req.body;

  if (!data || !data.label) {
    return res.end(ERRORS.NO_DATA);
  }

  const createdId = await createDeploy(req.user.uid, data.label);

  res.json({ createdId });
}