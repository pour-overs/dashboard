<script>
  import { get } from "svelte/store";
  import { stores } from "@sapper/app";
  import { labels } from "@components/Breadcrumbs.svelte";

  export let title = "";
  export let crumb = null;
  export let useAsBreadcrumb = false;

  $: if (useAsBreadcrumb) {
    const label = crumb == null ? title : crumb;
    const { page } = stores();
    let { path } = get(page);

    if (path.endsWith("/")) {
      path = path.substring(0, path.length - 1);
    }

    labels.update(registry => {
      console.log(`Registering "${path}" to "${label}"`);
      registry[path] = label;
      return registry;
    });
  }
</script>

<style>
  h1 {
    margin-bottom: 1em;
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<h1>
  <slot />
</h1>
