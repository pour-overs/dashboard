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
  import CollectionLayout from "@components/layouts/CollectionLayout/index.js";
  import PageTitle from "@components/PageTitle.svelte";
  import Loading from "@components/Loading.svelte";

  let loadingPages = new Deferred();

  onMount(() => {
    loadingPages.settleWith(loadWikiPages());
  });
</script>

<style>

  ul {
    list-style: none;
    padding: 0 0;
    margin: 0 0;
  }

  .actions {
    margin-bottom: 1rem;
  }

</style>


<PageTitle title="Wiki">
  Wiki
</PageTitle>

<CollectionLayout.Layout sidebar="right">
  <CollectionLayout.Collection></CollectionLayout.Collection>
    {#await loadingPages}
      <Loading text="Loading Wiki Pages" />
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
  <CollectionLayout.Sidebar>
    <h3 class="actions">Actions</h3>
    <a class="button" href="wiki/create">Create Wiki Page</a>
  </CollectionLayout.Sidebar>
</CollectionLayout.Layout>