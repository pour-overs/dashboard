<script>
	import { title } from "../config/app.config.js";
	import PageTitle from "@components/PageTitle.svelte";
</script>
<style>
</style>

<PageTitle {title}>{title}</PageTitle>

<p>
	This is the dashboard for the Pour Over Guides website, where guides can be created, edited, and published.
</p>

<p>The goal is to solve that there is no unifying source for learning about pour over guides on the web today.</p>

<p>Additionally, being able to compare, contrast, and glean interesting information from different methods.</p>


<h3>Potential Additions</h3>

<ul>
	<li>
		<a href="https://www.npmjs.com/package/svelte-frappe-charts">Add Charts</a>
	</li>
	<li>
		Image uploads
	</li>
	<li>"Sponsered" guides?</li>
</ul>