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

  table {
    width: 100%;
    border: 1px solid #ddd;
    margin: 1em auto;
  }

  thead th {
    border-bottom: 1px solid #ddd;
    padding: 0.5em 0;
  }

  tr.empty {
    text-align: center;
    color: #888;
  }

  .actions {
    width: 100%;
    padding: 1em 1em;
    text-align: right;
  }

</style>

<aside class="actions">
  <button type="button" class="button-link" on:click={createGuide}>Create Guide</button>
</aside>

<h1>Guides</h1>

<p>Lists all Pour Over Guides.</p>

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
        <td>{guide.steps ? guide.steps : "—"}</td>
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

</table>
