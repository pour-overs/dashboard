<script>
  import { fly } from "svelte/transition";
  import { pageExists, createWikiPage, defaultWiki } from "./_wikis.js";
  import { notify } from "@stores/notifications.js";
  import { goto } from "@sapper/app";

  import PageTitle from "@components/PageTitle.svelte";
  import WikiEditor from "./_wiki-editor.svelte";

  const title = "Create Wiki Page";
  let lastCreatedID = null;
  let wikiEditor = null;
  let wiki = defaultWiki();

  const submitHandler = async e => {
    console.log(wiki);

    wikiEditor.loading(true);

    const isAvailable = await slugIsAvailable(wiki.slug);
    if (!isAvailable) {
      notify(`Wiki Page with slug "${wiki.slug}" already exists`, 10000);
      wikiEditor.loading(false);
      return;
    }

    notify("Creating wiki page...");

    try {
      lastCreatedID = await createWikiPage(wiki);
    } 
    catch (err) {
      notify(err.message);
      wikiEditor.loading(false);
      return;
    }

    notify(`Wiki Page "${wiki.title}" created!`);
    wikiEditor.loading(false);
    isComplete = true;
  };

  const resetForm = () => {
    wikiEditor.reset();
    isComplete = false;
  };

  let isComplete = false;


  async function slugIsAvailable(slug) {
    if (slug.length > 0) {
      return !(await pageExists(slug));
    }

    return false;
  }
</script>

<style>

  .hidden {
    display: none;
  }

  .actions {
    text-align: left;
    padding: 1rem 0rem;
  }

  .actions > * {
    margin-right: 1rem;
  }

  h4 {
    margin-top: 4rem;
  }
</style>

<PageTitle {title} crumb={title} useAsBreadcrumb={true}>{title}</PageTitle>

<div class:hidden={isComplete}>
  <WikiEditor bind:this={wikiEditor} bind:wiki={wiki} on:submit={submitHandler} actionText={title} loadingText="Creating Wiki Page" />
</div>

{#if isComplete}
  <div in:fly={{ y: 100, duration: 500, }}>
    <h2>
      <strong>{wiki.title}</strong>
      created.
    </h2>
    <p>You've successfully created a new wiki page.</p>
    <h4>What next?</h4>
    <footer class="actions">
      <button on:click={goto(`/wiki/${lastCreatedID}`)}>
        Edit "
        <strong>{wiki.title}</strong>
        "
      </button>
      <span>or</span>
      <button type="button" on:click={resetForm}>Create another</button>
    </footer>
  </div>
{/if}
