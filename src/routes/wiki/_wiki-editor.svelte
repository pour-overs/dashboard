<script>
  import { defaultWiki, defaultContent, toSlug } from "./_wikis.js";
  import Loading from "@components/Loading.svelte";
  import MarkdownEditor from "@components/MarkdownEditor.svelte";
  import CodeMirrorProvider from "@providers/CodeMirrorProvider.svelte";

  export let actionText = "Save";
  export let loadingText = "Saving Changes";
  export let wiki = defaultWiki();

  let form = null;
  let editor = null;

  let isLoading = false;

  $: wiki.slug = toSlug(wiki.title);

  $: disabled = isLoading || wiki.title.length === 0 || wiki.slug.length === 0;
  $: submitText = isLoading ? "Saving..." : actionText;

  export function reset() {
    wiki = defaultWiki();
    editor.reset();
  }

  export function loading(toggle) {
    isLoading = toggle;
  }
</script>

<style>

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
</style>

{#if isLoading}
  <Loading text={loadingText} />
{/if}

<form on:submit|preventDefault bind:this={form} class:hidden={isLoading}>

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

  <slot />

  <fieldset>
    <CodeMirrorProvider>
      <MarkdownEditor bind:this={editor} bind:value={wiki.content} defaultValue={defaultContent} />
    </CodeMirrorProvider>
  </fieldset>

  <footer>
    <button type="submit" {disabled}>{submitText}</button>
  </footer>
</form>
