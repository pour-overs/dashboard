<script>
  import { onMount, setContext } from "svelte";


  let isLoaded = false;
  let _firebase = null;

  setContext("firebase", () => _firebase);


  onMount(async () => {

    const module = await import("../services/firebase-client.js");
    _firebase = module.firebaseApp;
    console.log("loaded firebase-client", _firebase);
    isLoaded = true;
  });
</script>

{#if isLoaded}
  <slot />
{:else}
  <p>Loading...</p>
{/if}