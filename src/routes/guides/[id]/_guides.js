import { notify } from "@stores/notifications.js";

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

const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';


/**
 * Creates a timestamp based id,
 * based on the firebase method of creating IDs
 *    https://gist.github.com/mikelehen/3596a30bd69384624c11
 */
export function createID() {
  let now = new Date().getTime();
  const timeStampChars = new Array(8);

  for (let i = 7; i >= 0; i--) {
    timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
    now = Math.floor(now / 64);
  }

  return timeStampChars.join("");
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