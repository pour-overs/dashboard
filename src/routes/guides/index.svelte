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
      return guides;
    }
  }
</script>

<script>
  import { fade } from "svelte/transition";
  import { Deferred } from "@utils";
  import { onMount } from "svelte";
  import PageTitle from "@components/PageTitle.svelte";
  import CollectionLayout from "@components/layouts/CollectionLayout";
  import Loading from "@components/Loading.svelte";

  let listGuidesForAllUsers = false;
  let loadingGuides = new Deferred();

  onMount(() => {
    const promise = loadGuides(listGuidesForAllUsers);
    loadingGuides.settleWith(promise);
  });

  function reloadGuides() {
    loadingGuides = new Deferred();

    const promise = loadGuides(listGuidesForAllUsers);
    loadingGuides.settleWith(promise);
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
    <strong>created by you</strong>.
  </p>
{/if}

<CollectionLayout.Layout sidebar="right" loading={loadingGuides}>
  <CollectionLayout.Collection>
    {#await loadingGuides}
      <Loading text="Loading Guides" />
    {:then guides}
      <div class="guides" transition:fade>
        {#each guides as guide}
          <a class="guide-card" href={`/guides/${guide.id}`}>
            <h2 class="title">{guide.title}</h2>
            <p>{guide.description}</p>
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
      </div>
    {:catch error}
      <p>
        Unable to load guides.
        <button on:click={reloadGuides}>Retry</button>
      </p>
    {/await}

  </CollectionLayout.Collection>
  <CollectionLayout.Sidebar>
    <div class="actions">
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

    </div>
  </CollectionLayout.Sidebar>
</CollectionLayout.Layout>
