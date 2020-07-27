<script context="module">
  export async function preload({ host, path, params, query }, session) {
    const { id } = params;
    const response = await this.fetch(`/api/guides/${id}`, {
      credentials: "include",
      method: "GET"
    });
    if (response.ok) {
      const guide = await response.json();

      return { guide };
    }
  }
</script>

<script>
  import PageTitle from "@components/PageTitle.svelte";
  import DateTime from "@components/DateTime.svelte";
  import Collapsible from "@components/Collapsible.svelte";

  import { notify } from "@stores/notifications.js";
  import { saveGuide } from "./_guides.js";

  export let guide = null;

  console.log(guide);

  let formDisabled = false;

  let createdAt = new Date(guide.createdAt.date);
  let lastModified = new Date(guide.lastModified.date);

  let hasChanged = false;

  const form = {
    isPublished: guide.isPublished,
    slug: guide.slug || "",
    title: guide.title || "",
    description: guide.description || "",
    introduction: {
      content: guide.introduction.content || "",
      youtubeUrl: guide.introduction.youtubeUrl || ""
    }
  };

  async function save() {

    formDisabled = true;
    const result = await saveGuide(guide.id, form);
    formDisabled = false;

    // if it was successfully saved, no new changes exist
    if (result !== null) {
      hasChanged = false;
    }
  }

  async function saveHandler(e) {
    await save();
  }

  async function togglePublished(e) {

    form.isPublished = !form.isPublished;
    const result = await save();

    if (result !== null ) {
      const state = form.isPublished ? "was published" : "has been unpublished";
      notify(`"${form.title}" ${state}.`, null);
    }
  }

  function hasFormChanged() {
    hasChanged = true;
  }
</script>

<style>
  label {
    display: block;
    margin: 0em auto;
    margin-bottom: 1em;
  }

  label input,
  label textarea {
    width: 100%;
    margin: 0em auto;
    padding: 0.5em 0.5em;
  }

  h2 {
    margin: 0 0;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    grid-column-gap: 0.5em;
    position: sticky;
    padding: 1em 1em;
    border: 1px solid #eee;
    margin: 1em auto;
    bottom: 0px;
    left: 0px;
    background-color: #fff;
    border-radius: 3px;
  }

  .title {
    font-weight: 600;
  }

  .time-info {
    text-transform: uppercase;
    font-size: 0.8em;
    margin: 1em 0;
  }

  .warning {
    font-size: 0.75;
    background-color: var(--color5);
    padding: 0.25em 0.5em;
    margin: 0 1em;
    border-radius: 6px;
  }
</style>

<PageTitle title={`Edit "${form.title}"${hasChanged ? "*" : ""}`}>
  Edit <span class="title">{form.title}</span>{hasChanged ? "*" : ""}
</PageTitle>

<Collapsible>

  <h2 slot="title">Status: {form.isPublished ? "Published" : "Draft"}</h2>

  <div slot="content">

    <p class="time-info">
      Published: {form.isPublished ? 'Yes' : 'No'}
      <br />
      Created on
      <DateTime date={guide.createdAt.date} displayTime={false} />
      <br />
      Last Modified on
      <DateTime date={guide.lastModified.date} />
    </p>

    <p>
      <button type="button" on:click={togglePublished}>
        {form.isPublished ? 'Unpublish' : 'Publish'}
      </button>
    </p>
  </div>
</Collapsible>

<form
  on:input={hasFormChanged}
  on:reset={() => (hasChanged = false)}
  disabled={formDisabled}>

  <div class="form-content">
    <Collapsible collapsed={false} >
      <h2 slot="title">Meta</h2>

      <section class="form-group" slot="content">
        <label>
          Title
          <input type="text" bind:value={form.title} />
        </label>

        <label>
          Short Description
          <textarea rows="5" bind:value={form.description} />
        </label>

        <label>
          Slug
          <input type="text" bind:value={form.slug} />
        </label>
      </section>

    </Collapsible>
    <Collapsible>
      <h2 slot="title">Introduction</h2>
      <section class="form-group" slot="content">

        <label>
          Introductory Text
          <textarea rows="8" bind:value={form.introduction.content} />
        </label>

        <label>
          Youtube URL
          <input type="text" bind:value={form.introduction.youtubeUrl} />
        </label>
      </section>
    </Collapsible>
    <Collapsible  collapsed={guide.steps.length === 0}>
      <h2 slot="title">Coffee & Steps</h2>
      <section class="form-group" slot="content">
        <p>There are {guide.steps.length} steps.</p>
        {#if guide.steps.length > 0}
          <ol>
            {#each guide.steps as step}
              <li>{step.title}</li>
            {/each}
          </ol>

        {/if}

        <a href={`/guides/${guide.id}/steps`}>Edit Coffee and Steps</a>
        {#if hasChanged}
          <span class="warning">You have unsaved changes</span>
        {/if}
      </section>
    </Collapsible>

  </div>

  <footer class="actions">
    <h2>{form.title || 'Untitled'}</h2>
    <button type="button" disabled={!hasChanged} on:click={saveHandler}>
      Save
    </button>
  </footer>

</form>