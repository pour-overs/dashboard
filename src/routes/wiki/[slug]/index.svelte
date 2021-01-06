<script context="module">
  import { getBySlug, parseMarkdown } from "../_wikis.js";

  export async function preload(page, session) {
    const { slug } = page.params;

    const wiki = await getBySlug.call(this, slug);

    return { wiki, slug };
  }
</script>

<script>
  import WikiEditor from "../_wiki-editor.svelte";
  import TwoColumnLayout from "@components/layouts/TwoColumnLayout.svelte";
  import PageTitle from "@components/PageTitle.svelte";

  export let slug;
  export let wiki;

  let wikiEditor = null;

  console.log(wiki);
  $: renderedMarkdown = parseMarkdown(wiki.content);

  async function submitHandler() {
    wikiEditor.loading(true);
  }
</script>

<style>
  .content {
    padding-right: 2rem;
  }

  .preview {
    margin: 1rem 0;
    border: 1px solid var(--border-color);
    width: 100%;
    padding-bottom: 1rem;
  }

  .preview h1 {
    text-transform: capitalize;
  }

  .preview .scaled {
    transform: scale(0.8);
  }
</style>

<TwoColumnLayout>
  <section class="content">
    <PageTitle title={`Edit ${wiki.title}`}>Edit</PageTitle>

    <form on:submit|preventDefault={submitHandler}>
      <WikiEditor bind:this={wikiEditor} on:submit={submitHandler} bind:wiki>
        <p>More form controls here...</p>
      </WikiEditor>
    </form>
  </section>

  <aside class="preview-column">
    <h2>Preview</h2>
    <div class="preview">
      <div class="scaled">
        <h1>{wiki.title}</h1>
        {@html renderedMarkdown}
      </div>
    </div>
  </aside>
</TwoColumnLayout>
