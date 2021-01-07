<script context="module">
  import { getByID, parseMarkdown, pageExists, updateWikiPage } from "../_wikis.js";

  export async function preload(page, session) {
    const { id } = page.params;

    const wiki = await getByID.call(this, id);

    return { wiki, id };
  }
</script>

<script>
  import { notify } from "@stores/notifications.js";
  import WikiEditor from "../_wiki-editor.svelte";
  import TwoColumnLayout from "@components/layouts/TwoColumnLayout.svelte";
  import PageTitle from "@components/PageTitle.svelte";

  export let id;
  id;
  export let wiki;
  let initialValue = Object.assign({}, wiki);
  console.log(initialValue);

  $: hasChanged = wiki.content !== initialValue.content || wiki.title !== initialValue.title;

  let wikiEditor = null;

  $: renderedMarkdown = parseMarkdown(wiki.content);

  async function submitHandler() {
    wikiEditor.loading(true);

    let slugHasChanged = wiki.slug !== initialValue.slug;

    if (slugHasChanged) {
      let isSlugTaken = await pageExists(wiki.slug);
      if (isSlugTaken) {
        wikiEditor.loading(false);
        notify(`Cannot rename: A Wiki Page with slug "${wiki.slug}" already exists`, 10000);
        return;
      }
    }

    try {
      await updateWikiPage(wiki);
    }
    catch (err) {
      notify(err.message);
      wikiEditor.loading(false);
      return;
    }

    notify(`Saved changes!`, 6000);
    wikiEditor.loading(false);

    // update initialValue upon save
    initialValue = wiki;
  }
</script>

<style>
  .content {
    padding-right: 2rem;
  }

  .preview {
    width: 100%;
    padding: 2rem 2rem;
    background-color: #bac5cc;
    color: #000;
    position: sticky;
    top: 1rem;
  }

  .preview h1 {
    text-transform: capitalize;
  }

  .scaled {
    font-size: 1rem;
  }

  @media (min-width: 50em) {
    .scaled {
      font-size: 0.8vw;
    }
  }
</style>

<TwoColumnLayout>
  <section class="content">
    <PageTitle title={`Edit ${wiki.title}`} crumb={wiki.title} useAsBreadcrumb={true}>Edit{hasChanged ? "*" : ""}</PageTitle>

    <form on:submit|preventDefault={submitHandler}>
      <WikiEditor bind:this={wikiEditor} on:submit={submitHandler} bind:wiki>

      </WikiEditor>
    </form>
  </section>

  <aside class="preview-column">
    <div class="preview">
      <div class="scaled">
        <h1>{wiki.title}</h1>
        {@html renderedMarkdown}
      </div>
    </div>
  </aside>

</TwoColumnLayout>
