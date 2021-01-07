<script>
  import { getContext } from "svelte";
  import { theme, THEMES } from "@stores/theme.js";
  import UserCard from "@components/UserCard.svelte";
  import PageTitle from "@components/PageTitle.svelte";

  export let ownPage = true;
  let user = getContext("user");

  $: isDarkMode = $theme === THEMES.DARK_MODE;

  function toggleDarkMode() {
    theme.update( t => t === THEMES.DEFAULT ? THEMES.DARK_MODE : THEMES.DEFAULT);
  }

</script>

<style>
  h2 {
    margin-top: 2rem;
  }
</style>

{#if ownPage}
  <PageTitle title="Your Account">Your Account</PageTitle>
{:else}
  <h2>Your Account</h2>
{/if}
<p>
  You're logged in as {user.name}.
  <a href="/auth/login">Sign out</a>
</p>

<h2>Settings</h2>

<p>
  <button on:click={toggleDarkMode}>{isDarkMode ? "Disable" : "Enable"} Dark Mode</button>
</p>





