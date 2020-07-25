<script context="module">

  export async function preload(page, session) {

    // assert we use the path `/guides` not `/guides/`
    if (page.path.endsWith("/")) {
      const url = page.path.substring(0, page.path.length - 1);
      this.redirect(301, url);
      return;
    }

    const response = await this.fetch("/api/guides/", {
      credentials: "include",
    });

    if (response.ok) {
      const guides = await response.json();
      return { guides };
    }
  }

</script>

<script>
  export let guides = [];
  console.log(guides);

  async function createGuide() {

    const response = await fetch("/api/guides/create", {
      credentials: "include",
      method: "POST",
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
</script>

<style>

  .guides {

  }

  .guide-card {
    border: 1px solid #eee;
    padding: 1em 1em;
    margin: 1em 0;
    max-width: 32em;
    display: block;
  }

  .guide-card:hover {
    border: 1px solid var(--color4);
  }

  .guide-card .title {
    font-weight: 600;
  }

</style>

<aside class="actions">
  <button type="button" class="button-link" on:click={createGuide}>Create Guide</button>
</aside>

<h1>Guides</h1>

<p>Lists all Pour Over Guides.</p>

<div class="guides">
  {#each guides as guide}
    <a class="guide-card" href={`/guides/${guide.id}`}>
      <h2 class="title">{guide.title}</h2>
      <p>{guide.introduction.content ? guide.introduction.content : "No introduction written."}</p>
      <p>
        <strong>URL:</strong> {guide.slug ? guide.slug : "not set"}
      </p>
      <p>
        <strong>Steps:</strong> {guide.steps ? guide.steps.map(s => s.title).join(", ") : "None."}
      </p>
    </a>
  {:else}
    <p>There are no guides yet.</p>
  {/each}
</div>
<!--
<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Slug</th>
      <th>Author</th>
      <th>Published</th>
      <th>Steps</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {#each guides as guide}
      <tr>
        <td>{guide.title}</td>
        <td>{guide.slug ? guide.slug : "—"}</td>
        <td>—</td>
        <td>{guide.isPublished ? "yes" : "no"}</td>
        <td>{guide.steps ? guide.steps.map(s => s.title).join(", ") : "—"}</td>
        <td>
          <a href={`/guides/${guide.id}`}>Edit</a>
        </td>
      </tr>
    {:else}
      <tr class="empty">
        <td colspan="6">
          <p>There aren't any guides yet.</p>
        </td>
      </tr>
    {/each}
  </tbody>

</table> -->
