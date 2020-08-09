<script context="module">
  /*
    Breadcrumbs ties couples with the PageTitle component.

  */
  import { writable } from "svelte/store";
  export const labels = writable(Object.create(null));
</script>

<script>
  import { get } from "svelte/store";
  import IconProvider from "@providers/IconProvider.svelte";
  import Icon from "@components/Icon.svelte";
  import { stores } from "@sapper/app";
  const { page } = stores();

  export let currentPath = "/";

  $: crumbs = buildCrumbs(currentPath, $labels);

  page.subscribe(({ path }) => {
    currentPath = path;
  });

  // fire a change when the labels change too
  // labels.subscribe( () => {
  //   console.log("labels changed");
  //   crumbs = buildCrumbs(currentPath);
  // });

  function buildCrumbs(path) {

    const registry = get(labels);

    const crumber = path
      .split("/")
      .filter(c => c.length > 0)
      .reduce((crumber, segment) => {
        // build out the url for each segment
        crumber.url += `/${segment}`;

        let label = segment;

        if (typeof registry[crumber.url] !== "undefined") {
          label = registry[crumber.url];
        }

        crumber.segments.push({
          segment,
          url: crumber.url,
          label: label,
        });
        return crumber;
      }, { url: "", segments: [], });

    return crumber.segments;
  }

</script>

<style>

  .breadcrumbs {
    font-size: 0.75em;
    margin-bottom: 0.5em;
    border-radius: 6px;
  }

  .breadcrumbs:hover {
    opacity: 1;
  }

  .breadcrumbs a:first-of-type {
    margin-left: 0;
  }

  .breadcrumbs a {
    margin: 0 0.25em;
    text-transform: capitalize;
  }
</style>

<IconProvider size={20} color="var(--selectable-bg--hover)">
  <nav class="breadcrumbs">
    <a href="/">Home</a>
    {#each crumbs as crumb, i (crumb.label)}
      <Icon name="chevron_right" />
      <a href={crumb.url}>{crumb.label}</a>
    {/each}
  </nav>
</IconProvider>
