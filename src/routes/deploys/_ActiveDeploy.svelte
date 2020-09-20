<script>
  export let id;

  let isLoading = true;
  let isValid = true;
  let deployStatus = "Triggered";

  import { getContext, onMount, createEventDispatcher } from "svelte";
  import { notify } from "@stores/notifications.js";

  import Warning from "@components/Warning.svelte";
  import Icon from "@components/Icon.svelte";

  const { database } = getContext("firebase")();
  const ref = database.ref(`deploys/${id}`);
  const dispatch = createEventDispatcher();

  function onError(error) {
    console.error(error);
    notify(error);
  }

  onMount(() => {
    const listener = ref.on(
      "value",
      function(snapshot) {
        isLoading = false;
        const value = snapshot.val();
        isValid = value !== null;

        if (isValid) {
          console.log({ snapshot: value });
          deployStatus = value.status;
          if (value.isComplete) {
            dispatch("complete");
          }
        }
      },
      onError
    );

    return () => ref.off("value", listener);
  });
</script>

<style>
  .status {
    border: 1px solid var(--color4);
    padding: 1em;
    margin: 0.5em auto;
    width: auto;
    color: var(--color4);
  }

  .loading-spinner {
    margin-right: 0.5em;
  }
</style>

{#if isLoading}
  <p>Loading...</p>
{:else if isValid}
  <div class="status">
    <span class="loading-spinner">
      <Icon name="sync" color="inherit" />
    </span>
    <strong>Status:</strong> {deployStatus}
  </div>
{:else}
  <Warning>
    Real-time changes to this deploy failed.
    <br />
    Reason:
    <strong>Deploy data does not exist for this id.</strong>
  </Warning>
{/if}
