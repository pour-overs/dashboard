<script>
  import { fly } from "svelte/transition";
  import { pageExists, createWikiPage, toSlug } from "./_wikis.js";
  import { notify } from "@stores/notifications.js";
  import { goto } from "@sapper/app";

  import PageTitle from "@components/PageTitle.svelte";
  import Loading from "@components/Loading.svelte";
  import MarkdownEditor, { defaultValue } from "@components/MarkdownEditor.svelte";
  import CodeMirrorProvider from "@providers/CodeMirrorProvider.svelte";

  let form = null;
  const title = "Create Wiki Page";
  let editor = null;

  const submitHandler = async e => {
    console.log(wiki);

    isLoading = true;
    const isAvailable = await slugIsAvailable(wiki.slug);
    if (!isAvailable) {
      notify(`Wiki Page with slug "${wiki.slug}" already exists`, 10000);
      isLoading = false;
      return;
    }

    notify("Creating wiki page...");

    try {
      let response = await createWiki(wiki);
    } catch (err) {
      notify(err.message);
      isLoading = false;
      return;
    }

    notify(`Wiki Page "${wiki.title}" created!`);
    isLoading = false;
    isComplete = true;
  };

  const resetForm = () => {
    wiki.title = "";
    wiki.content = defaultValue;
    wiki.slug = "";
    editor.reset();
    isComplete = false;
  };

  let isComplete = false;
  let isLoading = false;

  let wiki = {
    title: "",
    slug: "",
    content: defaultValue
  };

  $: wiki.slug = toSlug(wiki.title);

  $: disabled = wiki.title.length === 0 || wiki.slug.title === 0;

  async function slugIsAvailable(slug) {
    if (slug.length > 0) {
      return !(await pageExists(slug));
    }

    return false;
  }
</script>

<style>

  fieldset {
    padding: 0 0;
  }

  .hidden {
    display: none;
  }

  label {
    display: block;
    margin: 0em auto;
    margin-bottom: 1em;
  }

  label input {
    width: 100%;
    margin: 0em auto;
    padding: 0.5em 0.5em;
  }

  footer {
    text-align: right;
    padding: 1rem 0;
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

<form
  on:submit|preventDefault={submitHandler}
  bind:this={form}
  class:hidden={isComplete}>
  <fieldset>
    <label>
      Page Title
      <input type="text" name="title" bind:value={wiki.title} />
    </label>
  </fieldset>

  <fieldset>
    <label>
      Slug
      <input type="text" name="slug" bind:value={wiki.slug} />
    </label>
  </fieldset>

  <fieldset>
    <CodeMirrorProvider>
      <MarkdownEditor bind:this={editor} bind:value={wiki.content} />
    </CodeMirrorProvider>
  </fieldset>

  <footer>
    {#if isLoading}
      <Loading text="Creating Wiki Page" />
    {:else}
      <button type="submit" {disabled}>Create Wiki Page</button>
    {/if}
  </footer>
</form>

{#if isComplete}
  <div in:fly={{ y: 100, duration: 500, }}>
    <h2>
      <strong>{wiki.title}</strong>
      created.
    </h2>
    <p>You've successfully created a new wiki page.</p>
    <h4>What next?</h4>
    <footer class="actions">
      <button on:click={goto(`/wiki/${wiki.slug}`)}>
        Edit "
        <strong>{wiki.title}</strong>
        "
      </button>
      <span>or</span>
      <button type="button" on:click={resetForm}>Create another</button>
    </footer>
  </div>
{/if}
