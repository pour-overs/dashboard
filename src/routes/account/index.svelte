<script>
  import { getContext } from "svelte";
  import { theme, THEMES } from "@stores/theme.js";
  import UserCard from "@components/UserCard.svelte";

  let user = getContext("user");

  $: isDarkMode = $theme === THEMES.DARK_MODE;

  function toggleDarkMode() {
    theme.update( t => t === THEMES.DEFAULT ? THEMES.DARK_MODE : THEMES.DEFAULT);
  }

</script>

<style>
  h2 {
    margin-bottom: 1em;
  }
</style>

<h1>Your Account</h1>
<p>
  You're logged in as {user.name}.
  <a href="/auth/login">Sign out</a>
</p>

<h2>Settings</h2>

<button on:click={toggleDarkMode}>{isDarkMode ? "Disable" : "Enable"} Dark Mode</button>




