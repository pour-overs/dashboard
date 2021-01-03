<script>
  import { theme, THEMES } from "@stores/theme.js";
  import { title } from "../config/app.config.js";
  import PageTitle from "@components/PageTitle.svelte";
  import { getContext } from "svelte";
  import Account from "./account/index.svelte";

  const user = getContext("user");

  $: isDarkMode = $theme === THEMES.DARK_MODE;

  function toggleDarkMode() {
    theme.update( t => t === THEMES.DEFAULT ? THEMES.DARK_MODE : THEMES.DEFAULT);
  }

</script>
<style>

  .text-primary {
    color: var(--color1);
  }

  hr {
    margin: 4rem auto;
    opacity: 0.5;
  }

  h2 {
    margin-top: 2rem;
  }
</style>

<PageTitle {title}>
  Welcome, <span class="text-primary">{user.name.split(" ")[0]}!</span>
</PageTitle>
<p>
  This is the dashboard for the Pour Over Guides website. Here you can create, edit, and publish guides and wiki pages.
</p>

<h2>Vision</h2>
<p>The goal is to solve that there is no unifying source for learning about pour over guides on the web today.</p>

<p>Additionally, being able to compare, contrast, and glean interesting information from different methods.</p>

<h2>Potential Feature Additions</h2>

<ul>
  <li>
    <a href="https://www.npmjs.com/package/svelte-frappe-charts">Add Charts</a>
  </li>
  <li>"Sponsored"/Official guides?</li>
  <li>Attributions</li>
  <li>Nice art</li>
</ul>

<Account ownPage={false} />