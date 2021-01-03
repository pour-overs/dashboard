<script context="module">

  async function loadWikiPages() {
    const response = await fetch(`/api/wiki`, {
      credentials: "include"
    });

    if (response.ok) {
      const pages = await response.json();
      return pages;
    }
  }

</script>

<script>

  import { Deferred } from "@utils";
  import { onMount } from "svelte";
  import PageTitle from "@components/PageTitle.svelte";

  let loadingPages = new Deferred();

  onMount(() => {
    loadWikiPages()
      .then(loadingPages.resolve)
      .catch(loadingPages.reject);
  });
</script>

<style>

  ul {
    list-style: none;
    padding: 0 0;
    margin: 0 0;
  }

</style>


<PageTitle>
  Wiki
</PageTitle>

{#await loadingPages.promise}
  <p>Loading...</p>
{:then pages}
  <ul>
    {#each pages as page}
      <li>{page}</li>
    {:else}
      <li>
        <p>No wiki pages exist yet.</p>
      </li>
    {/each}
  </ul>
{/await}