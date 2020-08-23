<script>
	import { theme, THEMES } from "@stores/theme.js";
	import { title } from "../config/app.config.js";
	import PageTitle from "@components/PageTitle.svelte";


	$: isDarkMode = $theme === THEMES.DARK_MODE;

  function toggleDarkMode() {
    theme.update( t => t === THEMES.DEFAULT ? THEMES.DARK_MODE : THEMES.DEFAULT);
  }

</script>
<style>
</style>

<PageTitle {title}>{title}</PageTitle>

<p>
	This is the dashboard for the Pour Over Guides website, where guides can be created, edited, and published.
</p>

<p>The goal is to solve that there is no unifying source for learning about pour over guides on the web today.</p>

<p>Additionally, being able to compare, contrast, and glean interesting information from different methods.</p>

{#if isDarkMode}
	<p>
		<button on:click={toggleDarkMode}>Use default theme</button>
	</p>
{:else}
	<p>
	Try out <button on:click={toggleDarkMode}>Dark Mode</button>
</p>
{/if}


<h3>Potential Feature Additions</h3>

<ul>
	<li>
		<a href="https://www.npmjs.com/package/svelte-frappe-charts">Add Charts</a>
	</li>
	<li>
		Image uploads
	</li>
	<li>"Sponsored"/Official guides?</li>
	<li>Attributions</li>
	<li>Nice art</li>
</ul>