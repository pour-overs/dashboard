<script context="module">

  export async function preload({ host, path, params, query }, session) {
    const { id } = params;
    const response = await this.fetch(`/api/guides/${id}`, { credentials: "include", method: "GET", })
    if (response.ok) {
      const guide = await response.json();

      console.log(guide);
      return { guide };
    }

  }

</script>

<script>
  export let guide = null;

  let createdAt = new Date();
  createdAt.seconds = guide.createdAt._seconds;

  // form values
  let slug = guide.slug;
  let description = guide.description;
  let introductionContent = guide.introduction.content;
  let youtubeUrl = guide.introduction.youtubeUrl;
  let title = guide.title;

  function save(e) {

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

</style>

<h1>Edit Guide</h1>

<p>
  Created on {createdAt.toLocaleDateString()}.
</p>

<form>

  <div class="actions">
    <button type="button">{guide.isPublished ? "Publish" : "Unpublish"}</button>
  </div>

  <h2>Meta</h2>

  <section class="form-group">
    <label>
      Title
      <input type="text" bind:value={title} />
    </label>

    <label>
      Short Description
      <textarea rows="5" bind:value={description}></textarea>
    </label>

    <label>
      Slug <input type="text" bind:value={slug} />
    </label>
  </section>

  <h2>Introduction</h2>
<section class="form-group">

    <label>
      Introductory Text
      <textarea rows="8" bind:value={introductionContent}></textarea>
    </label>

    <label>
      Youtube URL
      <input type="text" bind:value={youtubeUrl} />
    </label>
</section>

  <h2>Steps</h2>

  <p>
    There are {guide.steps ? guide.steps : 0} steps.
  </p>

</form>

