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
export const client = new CloudBuildClient();

/**
 * 
 * ref: https://github.com/googleapis/nodejs-cloudbuild#using-the-client-library
 */
export async function runBuild(triggerId, branchName) {
  // Starts a build against the branch provided.
  const projectId = PROJECT_ID;

  const [resp] = await cb.runBuildTrigger({
    projectId,
    triggerId,
    source: {
      projectId,
      dir: './',
      branchName,
    },
  });

  for (const step of build.steps) {
    console.info(
      `step:\n\tname: ${step.name}\n\tstatus: ${STATUS_LOOKUP[build.status]}`
    );
  }
}

