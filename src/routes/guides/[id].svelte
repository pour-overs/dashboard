<script context="module">
  export async function preload({ host, path, params, query }, session) {
    const { id } = params;
    const response = await this.fetch(`/api/guides/${id}`, {
      credentials: "include",
      method: "GET"
    });
    if (response.ok) {
      const guide = await response.json();

      console.log(guide);
      return { guide };
    }
  }
</script>

<script>

  import { notify } from "../../stores/notifications.js";

  export let guide = null;
  let formDisabled = false;

  let createdAt = new Date();
  createdAt.seconds = guide.createdAt._seconds;

  let hasChanged = false;

  const form = {
    isPublished: guide.isPublished,
    slug: guide.slug || "",
    title: guide.title || "",
    description: guide.description || "",
    introduction: {
      content: guide.introduction.content || "",
      youtubeUrl: guide.introduction.youtubeUrl || ""
    },
  };

  async function save(e) {
    console.log("Save form with:", form);
    formDisabled = true;

    const response = await fetch(`/api/guides/${guide.id}`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    formDisabled = false;

    if (!response.ok) {
      console.error(response);
      notify(`A network error occurred.`, 6000);
      return;
    }

    const writeResult = await response.json();
    hasChanged = false;
  }

  async function saveHandler(e) {
    await save();
    notify(`"${form.title}" was saved!`, 5000);
  }

  function togglePublished(e) {
    form.isPublished = !form.isPublished;
    save(e);
    const state = form.isPublished ? "was published" : "has been unpublished";
    notify(`"${form.title}" ${state}.`, 10000);
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

  .form-group {
    padding: 1em 1em;
    border: 1px solid #eee;
    border-radius: 3px;
    margin: 1em auto 2em auto;
    max-width: 120em;
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
</style>

<h1>Edit Guide</h1>

<p>Created on {createdAt.toLocaleDateString()}.</p>

<form on:input={hasFormChanged} on:reset={() => (hasChanged = false)} disabled={formDisabled}>

  <div class="form-content">

    <h2>Meta</h2>

    <section class="form-group">
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

    <h2>Introduction</h2>
    <section class="form-group">

      <label>
        Introductory Text
        <textarea rows="8" bind:value={form.introduction.content} />
      </label>

      <label>
        Youtube URL
        <input type="text" bind:value={form.introduction.youtubeUrl} />
      </label>
    </section>

    <section class="form-group">
      <h2>Steps</h2>

      <p>There are {guide.steps ? guide.steps : 0} steps.</p>
    </section>

  </div>


  <footer class="actions">
    <h2>{form.title || "Untitled"}</h2>
    <button type="button" on:click={togglePublished}>{form.isPublished ? 'Unpublish' : 'Publish'}</button>
    <button type="button" disabled={!hasChanged} on:click={saveHandler}>Save</button>
  </footer>

</form>
