<script>
  import { onMount, getContext } from "svelte";
  import { storageImagePath as path } from "@config/app.config.js";
  const getFirebase = getContext("firebase");

  let storageRef = null;

  let items = [];

  export let label = "Image";
  export let value = null;
  let isLoading = true;
  let imagePath = null;
  $: getPath(value || null);

  async function getPath(file) {
    if (storageRef === null) return;
    if (file === null) {
      imagePath = null;
    } else {
      imagePath = await storageRef.child(file).getDownloadURL();
    }
  }

  onMount(() => {
    const { storage } = getFirebase();

    storageRef = storage.ref().child(path);

    refreshList();

    return () => (storageRef = null);
  });

  async function refreshList() {
    isLoading = true;
    const response = await storageRef.listAll();

    items = response.items.map((item) => item.name);

    if (value !== null) {
      getPath(value || null);
    }

    isLoading = false;
  }
</script>

<style>
  .preview {
    display: inline-block;
    padding: 0.5rem 0;
  }

  select {
    width: 100%;
  }
</style>

{#if isLoading}
  <p>Loading...</p>
{:else}
  {#if items.length === 0}
    <p>
      No uploaded assets.
      <a href="/assets" target="_blank">Go to Asset Uploader</a>
    </p>
  {:else}
    <label>
      {label}
      <select bind:value>
        <option value={null}>None</option>
        {#each items as item}
          <option value={item}>{item}</option>
        {/each}
      </select>
    </label>
    {#if imagePath}
      <a class="preview" href={imagePath} target="_blank">View Image</a>
    {/if}
  {/if}
{/if}
