export const title = "Pour Over Guides";

/**
 * The Google Cloud Build triggerID's for the various environments
 * 
 * https://console.cloud.google.com/cloud-build/triggers/edit/74781781-b39e-4823-b8b6-f5f1c40440fd?project=pour-over-guides
 * 
 * This fn returns a map that allows reverse-lookups
 */
export const cloudBuildTriggers = (() => {
  const triggers = new Map();

  let entries = [
    ["staging.pouroverguides.com", "1e4e15fb-f633-40be-918b-ef8f0bfd5d98"],
    ["pouroverguides.com", "b941cec0-e431-4509-b3d1-a9be42d2ce04"],
    ["dashboard.pouroverguides.com", "74781781-b39e-4823-b8b6-f5f1c40440fd"],
  ];

  entries.forEach( ([key, id]) => {
    triggers.set(key, id);
    triggers.set(id, key);
  });

  return triggers;
})();
