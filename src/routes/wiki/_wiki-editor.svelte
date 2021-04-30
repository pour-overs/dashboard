<script>
  import { onMount } from "svelte";
  import { defaultWiki, defaultContent, toSlug, getSettings } from "./_wikis.js";
  import Loading from "@components/Loading.svelte";
  import MarkdownEditor from "@components/MarkdownEditor.svelte";
  import CodeMirrorProvider from "@providers/CodeMirrorProvider.svelte";

  export let actionText = "Save";
  export let loadingText = "Saving Changes";
  export let wiki = defaultWiki();

  let form = null;
  let editor = null;

  let wikiSettings = null;
  let isLoading = false;

  $: wiki.slug = toSlug(wiki.title);

  $: disabled = isLoading || wiki.title.length === 0 || wiki.slug.length === 0;
  $: submitText = isLoading ? "Saving..." : actionText;

  onMount(() => {
    wikiSettings = getSettings();
  })

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
      Route
      <input type="text" name="topic" bind:value={wiki.topic} list="topics" placeholder="/"/>
      {#if wikiSettings !== null}
        <datalist id="topics">
          {#await wikiSettings}
            <option>Loading...</option>
          {:then settings}
            {#each Object.keys(settings.topics).filter( t => t !== "root") as topic}
              <option value={`${topic}`}>/{topic}/</option>
            {/each}
          {/await}
        </datalist>
      {/if}
    </label>
  </fieldset>
  <fieldset>
    <label>
      Slug
      <input type="text" name="slug" bind:value={wiki.slug} />
    </label>
  </fieldset>

  <fieldset>
    <label>
      Page Description
      <input type="text" bind:value={wiki.description}>
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
