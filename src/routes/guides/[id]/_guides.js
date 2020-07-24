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

  notify(`Saved ${guideData.title || "guide"}`);
  return await response.json();
}