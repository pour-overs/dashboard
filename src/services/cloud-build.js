import { CloudBuildClient } from "@google-cloud/cloudbuild";

const PROJECT_ID = "pour-over-guides";

export const STATUS_LOOKUP = [
  "UNKNOWN",
  "Queued",
  "Working",
  "Success",
  "Failure",
  "Error",
  "Timeout",
  "Cancelled",
];


// Creates a client
export const cloudBuild = new CloudBuildClient();

/**
 * 
 * ref: https://github.com/googleapis/nodejs-cloudbuild#using-the-client-library
 */
export async function runBuild(triggerId, branchName) {
  // Starts a build against the branch provided.
  const projectId = PROJECT_ID;

  const [longRunningOperation] = await cloudBuild.runBuildTrigger({
    projectId,
    triggerId,
    source: {
      projectId,
      dir: './',
      branchName,
    },
  });

  return longRunningOperation;
}

/**
 * 
 * @param {int} [pageSize=10] the number of builds that should be returned
 */
export async function listBuilds() {
  const projectId = PROJECT_ID;

  /* IListBuildsResponse */
  const [builds] = await cloudBuild.listBuilds({ projectId });

  return builds || [];
}
