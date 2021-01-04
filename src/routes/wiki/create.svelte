<script>
  import PageTitle from "@components/PageTitle.svelte";
  import MarkdownEditor from "@components/MarkdownEditor.svelte";
  import CodeMirrorProvider from "@providers/CodeMirrorProvider.svelte";

  const title = "Create Wiki Page";

  const createWiki = async () => {};
  
  let form = {
    title: "",
    slug: "",
  }

  function updateSlug() {
    form.slug = encodeURIComponent(form.title.toLowerCase().replaceAll(" ", "-"));
  }

</script>

<style>

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

</style>

<PageTitle {title} crumb={title} useAsBreadcrumb={true}>{title}</PageTitle>

<form on:submit={createWiki}>
  <fieldset>
    <label>
      Page Title
      <input type="text" name="title" bind:value={form.title} on:change={updateSlug} />
    </label>
  </fieldset>

  <fieldset>
    <label>
      Slug
      <input type="text" name="slug" readonly bind:value={form.slug} />
    </label>
  </fieldset>

  <fieldset>
    <CodeMirrorProvider>
      <MarkdownEditor />
    </CodeMirrorProvider>
  </fieldset>

</form>
