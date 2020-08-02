<script>
  import { onMount } from "svelte";
  import { theme, THEMES } from "@stores/theme.js";

  const LOCALSTORAGE_KEY = "theme";
  let firstMount = true;

  onMount(() => {

    if (window && firstMount) {
      firstMount = false;
      let loadedTheme = window.localStorage.getItem(LOCALSTORAGE_KEY);
      if (loadedTheme) {
        theme.set(loadedTheme);
      }
    }

    if (document.body) {
      const unlisten = theme.subscribe((theme) => {
        document.body.classList.toggle(THEMES.DEFAULT, theme === THEMES.DEFAULT);
        document.body.classList.toggle(THEMES.DARK_MODE, theme === THEMES.DARK_MODE);
        window.localStorage.setItem(LOCALSTORAGE_KEY, theme);
      });

      return unlisten;
    }


  })

</script>

<slot />