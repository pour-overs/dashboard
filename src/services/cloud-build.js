import { CloudBuildClient } from "@google-cloud/cloudbuild";

const PROJECT_ID = "pour-over-guides";

const STATUS_LOOKUP = [
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

  const [resp] = await cloudBuild.runBuildTrigger({
    projectId,
    triggerId,
    source: {
      projectId,
      dir: './',
      branchName,
    },
  });

  console.info(`triggered build for ${triggerId}`);
  const [build] = await resp.promise();

  for (const step of build.steps) {
    console.info(
      `step:\n\tname: ${step.name}\n\tstatus: ${STATUS_LOOKUP[build.status]}`
    );
  }
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
