import { firestore, database, firestoreFields } from "@services/firebase.js";
import { cloudBuildTriggers, cloudBuildTargets } from "@config/app.config.js";
import { listBuilds, runBuild, STATUS_LOOKUP } from "@services/cloud-build.js";

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

const FieldValue = firestoreFields.FieldValue;
const timestamp = () => FieldValue.serverTimestamp();

const realTimeDeployRef = database.ref("deploys");
const deploysRef = firestore.collection("deploys");
const useRealTimeDatabase = true;

/**
 * Create a new deploy and associate to the userId
 * @returns {Promise<any>} A promise that resolves to the newly created Deploy ID
 */
export async function createDeploy(triggerId, branchName) {

  console.log(`Triggered build for trigger "${triggerId}" on "${branchName}"`);
  /** @type google.devtools.cloudbuild.v1. IBuild */
  const longRunningOperation = await runBuild(triggerId, branchName);

  // "web job" status tracker
  // @todo find out if a cloud function is more appropriate
  if (useRealTimeDatabase) {

    console.log(`Using RTDB to track trigger: ${triggerId}`);

    await setRealTimeDBEntry(triggerId, false, "Triggering");

      // not awaiting — "webjob" style
      const start = Date.now();
      let end = Date.now();
      console.log("Starting LongRunningOperation.")
      longRunningOperation.promise()
        .then(async ([build]) => {
          console.log(`Build complete (from trigger: ${triggerId}, buildID: ${build.id})`);
          debugger;
          const statusText = STATUS_LOOKUP[build.status];
          await setRealTimeDBEntry(triggerId, true, `Status: ${statusText}`);

          for (const step of build.steps) {
            console.log(`step:\n\tname: ${step.name}\n\tstatus: ${statusText}`);
          }

          end = Date.now();
          console.log(`Ending LongRunningOperation. Duration: ${end - start}`);
        })
        .catch(async (err) => {
          end = Date.now();
          console.log(`Ending LongRunningOperation. Duration: ${end - start}`);
          console.log(`Long running operation failed. trigger: ${triggerId})`);
          console.error(err);
          await setRealTimeDBEntry(triggerId, true, `Long running operation failed. ${err}`)
            .catch(() => console.error("Failed to set RTDB"));
        })
  }

  return { triggerId };
}

/**
 *
 */
export async function listDeploys() {

  const builds = await listBuilds();

  builds.forEach( build => {
    build.createTime.date = toDate(build.createTime);
    build.startTime.date = toDate(build.startTime);

    if (build.finishTime !== null) {
      build.finishTime.date = toDate(build.finishTime);
    }
    build.url = `https://console.cloud.google.com/cloud-build/builds/${build.id}?project=${build.projectId}`;

    build.isActive = ["WORKING", "QUEUED"].includes(build.status);

    let label = cloudBuildTargets.get(build.buildTriggerId);
    if (typeof label === "undefined") {
      label = "Unknown Build";
    }
    build.name = label;
  });

  return builds;
}

/**
 * Convert a Google ITimestamp into a Date for the specified time
 * @param {google.protobuf.ITimestamp} timestamp
 * @see https://googleapis.dev/nodejs/cloudbuild/latest/google.protobuf.ITimestamp.html
 * @returns {Date} A date object
 */
function toDate(timestamp) {
  const seconds = parseInt(timestamp.seconds, 10);
  let date = new Date(seconds * 1000);
  return date;
}


async function setRealTimeDBEntry(triggerId, isComplete, status) {
  return await realTimeDeployRef
    .child(triggerId)
    .set({ triggerId, isComplete, status, })
    .catch(function(error) {
      console.log("Unable to set real time database entry", error);
    });
}