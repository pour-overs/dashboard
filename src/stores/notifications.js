import { writable } from "svelte/store"

export const notifications = writable(null);

export const loading = writable(false);

/**
 * A loading notification to display to the user that something is happening.
*/
export const isLoading = (toggle) => {
  loading.set(toggle);
};

let timeoutId = null;
/**
 * Disply a notification message for a set amount of time
 * @param {string} message The message to display
 * @param {int?} [duration=null] A duration to display the message, or null for it to persist
 */
export const notify = (message, duration = null) => {
  notifications.set(message);
  if (duration !== null) {
    clearTimer();

    timeoutId = window.setTimeout(() => {
      clearNotification();
    }, duration);
  }
};

const clearTimer = () => {
  if (timeoutId !== null) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }
}

export const clearNotification = () => {
  clearTimer();
  notifications.set(null);
};