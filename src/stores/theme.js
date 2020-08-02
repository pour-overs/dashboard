import { writable } from "svelte/store";

export const THEMES = {
  DEFAULT: "theme--default",
  DARK_MODE: "theme--dark",
};

export const theme = writable(THEMES.DEFAULT);
