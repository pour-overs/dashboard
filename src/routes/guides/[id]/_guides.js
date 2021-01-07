import { notify } from "@stores/notifications.js";
import { uuid } from "@utils";

export async function saveGuide(id, guideData) {

  notify("Saving...", null);
  const response = await fetch(`/api/guides/${id}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(guideData)
  });

  if (!response.ok) {
    notify(`A network error occurred when trying to save.`, 6000);
    return null;
  }

  notify(`Saved changes to "${guideData.title || "guide"}"`);
  return await response.json();
}


export function createID() {
  return uuid();
}

export function createStep(order) {
  return {
    id: createID(),
    title: `Step ${order + 1}`,
    order,
    description: "",
    dose: 0,
    duration: 1,
    drainDuration: 0,
    pour: "continuous", // pulse|continuous
  };
}

export const grindOptions = [
  "coarse",
  "fine",
  "very fine"
];