<script context="module">
  export async function preload(page, session) {
    // assert we use the path `/guides` not `/guides/`
    if (page.path.endsWith("/")) {
      const url = page.path.substring(0, page.path.length - 1);
      this.redirect(301, url);
      return;
    }

    return;
  }

  async function loadGuides(showAll) {
    const response = await fetch(`/api/guides${showAll ? "?showAll" : ""}`, {
      credentials: "include"
    });

    if (response.ok) {
      const guides = await response.json();
      console.log(guides);
      return guides;
    }
  }
</script>

<script>
  import { Deferred } from "@utils";
  import { onMount } from "svelte";
  import PageTitle from "@components/PageTitle.svelte";

  let listGuidesForAllUsers = false;
  let loadingGuides = new Deferred();

  onMount(() => {
    loadGuides(listGuidesForAllUsers)
      .then(loadingGuides.resolve)
      .catch(loadingGuides.reject);
  });

  function reloadGuides() {
    loadingGuides = new Deferred();

    loadGuides(listGuidesForAllUsers)
      .then(loadingGuides.resolve)
      .catch(loadingGuides.reject);
  }

  async function createGuide() {
    const response = await fetch("/api/guides/create", {
      credentials: "include",
      method: "POST"
    });

    if (!response.ok) {
      console.error(response);
      return;
    }

    const { createdId } = await response.json();

    if (createdId) {
      window.location = `${window.location}/${createdId}`;
    }
  }

  async function toggleGuidesView() {
    listGuidesForAllUsers = !listGuidesForAllUsers;
    reloadGuides();
  }
</script>

<style>
  .guides {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .guide-card {
    border: 1px solid var(--border-color);
    padding: 1em 1em;
    margin: 0 1em 1em 0;
    max-width: 32em;
    display: block;
    color: var(--body-color);
    text-decoration: none;
  }

  .guide-card:hover {
    border: 1px solid var(--color4);
    color: var(--body-color);
    background-color: rgba(255, 255, 255, 0.1);
  }

  .guide-card .title {
    color: var(--color1);
    font-weight: 600;
  }

  .guide-layout {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: flex-start;
  }

  .actions {
    padding: 1em 1em;
    position: sticky;
    top: 0;
    border: 1px solid var(--border-color);
  }

  .actions h3 {
    margin-bottom: 1em;
  }

  .actions button {
    margin-bottom: 0.5em;
    display: block;
    width: 100%;
  }
</style>

<PageTitle title="Guides">Guides</PageTitle>

{#if listGuidesForAllUsers}
  <p>Listing all Pour Over Guides.</p>
{:else}
  <p>
    Listing Pour Over Guides
    <strong>created by you</strong>
    .
  </p>
{/if}

<div class="guide-layout">

  <div class="guides">
    {#await loadingGuides.promise}
      <p>Loading...</p>
    {:then guides}
      {#each guides as guide}
        <a class="guide-card" href={`/guides/${guide.id}`}>
          <h2 class="title">{guide.title}</h2>
          <p>
            {guide.introduction.content ? guide.introduction.content : 'No introduction written.'}
          </p>
          <p>
            <strong>URL:</strong>
            {guide.slug ? guide.slug : 'not set'}
          </p>
          <p>
            <strong>Steps:</strong>
            {guide.steps ? guide.steps.map(s => s.title).join(', ') : 'None.'}
          </p>
        </a>
      {:else}
        <p>There are no guides yet.</p>
      {/each}
    {:catch error}
      <p>
        Unable to load guides.
        <button on:click={reloadGuides}>Retry</button>
      </p>
    {/await}

  </div>

  <aside class="actions">
    <h3>Actions</h3>

    <button type="button" class="button-link" on:click={createGuide}>
      Create New Guide
    </button>

    <button type="button" class="button-link" on:click={toggleGuidesView}>
      Show:
      <strong>{listGuidesForAllUsers ? 'Only Mine' : 'All'}</strong>
    </button>

    <button disabled={true}>
      Order By:
      <strong>Last Modified</strong>
    </button>

  </aside>
</div>
