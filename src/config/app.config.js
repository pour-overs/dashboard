export const title = "Bloom & Pour";

export const productionDomain = "https://bloomandpour.com";

/**
 * The Google Cloud Build triggerID's for the various environments
 *
 * https://console.cloud.google.com/cloud-build/triggers/edit/016abd83-6f1c-4d18-b14f-d65e34fa66e8?authuser=0&project=bloomandpour
 */

 export const productionKey = "bloomandpour.com";
 export const stagingKey = "staging.bloomandpour.com";
 export const dashboardKey = "dashboard.bloomandpour.com";

 export const entries = [
  [productionKey, "d1ffcafa-3afe-4fba-a566-ef0c2e846c89"],
  [stagingKey, "016abd83-6f1c-4d18-b14f-d65e34fa66e8"],
  [dashboardKey, "db6f08dc-fa3b-4c4a-8f9d-09d63598fadd"],
];

export const cloudBuildTriggers = new Map();
export const cloudBuildTargets = new Map();

entries.forEach( ([key, id]) => {
  cloudBuildTriggers.set(key, id);
  cloudBuildTargets.set(id, key);
});


export const storageImagePath = "images";
