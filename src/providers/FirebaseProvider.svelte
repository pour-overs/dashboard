<script>
  import { onMount, setContext } from "svelte";
  import Loading from "@components/Loading.svelte";

  /*

    The FireBaseProvider exports the entire firebase-client module to the context

  */

  let isLoaded = false;
  let firebaseModule = null;
  let resolveFirebase = null;

  setContext("firebase", () => firebaseModule);
  setContext("load:firebase", new Promise((resolve, reject) => {
    resolveFirebase = resolve;
  }));

  onMount(async () => {

    const module = await import("@services/firebase-client.js");
    firebaseModule = module;
    isLoaded = true;

    resolveFirebase(firebaseModule);
  });

</script>

{#if isLoaded}
  <slot />
{:else}
  <Loading text="Loading" />
{/if}