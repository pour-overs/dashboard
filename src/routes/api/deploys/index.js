import { listDeploys } from "@services/deploys.js";

export async function get(req, res, next) {
  if (!req.user) {
    return next();
  }

  const deploys = await listDeploys();

  return res.json(deploys);
}