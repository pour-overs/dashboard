import { createDeploy } from "@services/deploys.js";

const ERRORS = {
  NO_DATA: "A label is required."
};


export async function post(req, res, next) {
  
  if (!req.user) {
    return next();
  }

  const data = req.body;

  if (!data || !data.triggerId || !data.branchName) {
    return res.end(ERRORS.NO_DATA);
  }

  const { triggerId } = await createDeploy(data.triggerId, data.branchName);

  res.json({ triggerId });
}