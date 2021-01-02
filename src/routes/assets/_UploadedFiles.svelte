<script>
  import { storageImagePath as path } from "@config/app.config.js";

  import { getContext, onMount } from "svelte";
  import Icon from "@components/Icon.svelte";
  import { notify } from "@stores/notifications.js";

  const getFirebase = getContext("firebase");

  const VIEWS = {
    LIST: 0,
    THUMBS: 1,
  };

  export let files = [];
  export let view = VIEWS.LIST;

  let isLoading = true;
  let isDisabled = false;
  let ref = null;

  const toggleView = () => {
    view = view === VIEWS.LIST ? VIEWS.THUMBS : VIEWS.LIST;
  };

  const deleteImage = async (name) => {

    if (!confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    isDisabled = true;

    try {
      await ref.child(name).delete();
    } catch (error) {
      notify(error.code);
      return;
    }
    notify(`${name} was deleted`, 2000);
    files = files.filter((file) => file.name !== name);
    isDisabled = false;
  };

  const loadImages = async () => {
    const response = await ref.listAll();
    files = response.items.map((item) => {
      return {
        name: item.name,
        url: item.getDownloadURL(),
      };
    });
    isLoading = false;

  };

  onMount(() => {
    const { storage } = getFirebase();

    ref = storage.ref().child(path);
    loadImages();

    return () => {
      isLoading = true;
      ref = null;
    };
  });
</script>

<style>
  ul {
    list-style: none;
    margin: 0 0;
    padding: 1rem 0;
  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .list .asset {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-column-gap: 1rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.5rem;
    align-items: center;
  }

  .thumbs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1.5rem;
  }

  .thumbs .asset {
    width: 100%;
    height: 100%;
    border: 2px solid var(--link-color);
    background-color: var(--selectable-bg);
  }

  .thumbs .asset:hover {
    border: 2px solid var(--link-color--hover);
    background-color: var(--selectable-bg--hover);
  }

  .thumbs .asset img {
    display: block;
    width: 100%;
  }

  header {
    text-align: right;
    padding: 1rem 1rem;
  }
</style>

<header>
  <button type="button" on:click={() => toggleView()}>Show:
    <strong>{view === VIEWS.LIST ? 'As Thumbnails' : 'As List'}</strong></button>
</header>

<ul
  class:disabled={isDisabled}
  class:thumbs={view === VIEWS.THUMBS}
  class:list={view === VIEWS.LIST}>
  {#if isLoading}
    Loading...
  {:else}
    {#each files as file}
      <li class="asset">
        {#if view === VIEWS.LIST}
          <Icon name="photo" />
          <div class="link">
            {#await file.url}
              <span class="filename">{file.name}</span>
            {:then href}
              <a class="filename" {href} target="_blank">{file.name}</a>
            {/await}
          </div>
          <div class="actions">
            <button
              type="button"
              class="button--danger"
              on:click={() => deleteImage(file.name)}>Delete</button>
          </div>
        {:else}
          {#await file.url}
            <div class="scaffold" />
          {:then href}
            <a {href} target="_blank">
              <img src={href} alt={file.name} title={file.name} />
            </a>
          {/await}
        {/if}
      </li>
    {:else}
      <li class="disabled">No images uploaded.</li>
    {/each}
  {/if}
</ul>
