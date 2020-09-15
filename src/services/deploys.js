import { firestore, database, firestoreFields } from "@services/firebase.js";
import { cloudBuildTriggers, cloudBuildTargets } from "@config/app.config.js";
import { listBuilds, runBuild } from "@services/cloud-build.js";

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

const FieldValue = firestoreFields.FieldValue;
const timestamp = () => FieldValue.serverTimestamp();

const realTimeDeployRef = database.ref("deploys");
const deploysRef = firestore.collection("deploys");

/**
 * Create a new deploy and associate to the userId
 * @returns {Promise<string>} A promise that resolves to the newly created Deploy ID
 */
export async function createDeploy(userId, label) {

  const deployItem = _createDeploy(userId, label);

  const ref = await deploysRef.add(deployItem);

  // creating a deploy also creates a rtdb entry for tracking the deploy
  await realTimeDeployRef
    .child(ref.id)
    .set({
      id: ref.id,
      isComplete: false,
      status: "Triggering",
    })
    .catch(function(error) {
      console.log("Unable to set real time database entry", error);
    });

  return ref.id;
}

/**
 * 
 */
export async function listDeploys() {

  const builds = await listBuilds();

  builds.forEach( build => {
    build.createTime.date = toDate(build.createTime);
    build.startTime.date = toDate(build.startTime);
    build.finishTime.date = toDate(build.finishTime);
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
