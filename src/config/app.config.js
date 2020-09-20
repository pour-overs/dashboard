export const title = "Pour Over Guides";

/**
 * The Google Cloud Build triggerID's for the various environments
 * 
 * https://console.cloud.google.com/cloud-build/triggers/edit/74781781-b39e-4823-b8b6-f5f1c40440fd?project=pour-over-guides
 */

 export const productionKey = "pouroverguides.com";
 export const stagingKey = "staging.pouroverguides.com";
 export const dashboardKey = "dashboard.pouroverguides.com";

 export const entries = [
  [stagingKey, "1e4e15fb-f633-40be-918b-ef8f0bfd5d98"],
  [productionKey, "b941cec0-e431-4509-b3d1-a9be42d2ce04"],
  [dashboardKey, "74781781-b39e-4823-b8b6-f5f1c40440fd"],
];

export const cloudBuildTriggers = new Map();
export const cloudBuildTargets = new Map();

entries.forEach( ([key, id]) => {
  cloudBuildTriggers.set(key, id);
  cloudBuildTargets.set(id, key);
});

