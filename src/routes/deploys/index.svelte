<script context="module">
  import { notify } from "@stores/notifications.js";

  async function loadDeploys() {
    const response = await fetch(`/api/deploys`, {
      credentials: "include"
    });

    if (response.ok) {
      const deploys = await response.json();
      return deploys;
    }
  }

  async function newDeploy(label) {
    const response = await fetch(`/api/deploys/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ label })
    });

    if (!response.ok) {
      console.error(response);
      notify(response);
      return;
    }

    const { createdId } = await response.json();

    return createdId;
  }
</script>

<script>
  import { Deferred } from "@utils";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import DeployHistory from "./_DeployHistory.svelte";
  import PageTitle from "@components/PageTitle.svelte";
  import Collapsible from "@components/Collapsible.svelte";

  let deploys = [];
  let loadingDeploys = new Deferred();
  $: isLoadingDeploys = loadingDeploys.promise.status === "pending";

  onMount(() => {
    loadDeploys()
      .then((_deploys) => {
        deploys = _deploys || [];
        loadingDeploys.resolve(_deploys);
      })
      .catch(loadingDeploys.reject);
  });

  let activeDeploy = null;
  $: hasActiveDeploy = activeDeploy !== null;

  let deployName = "";
  $: isDeployable = deployName.length >= 2;

  async function createDeploy() {
    notify(`Creating new deploy...`);
    const createdId = await newDeploy(deployName);
    if (createdId) {
      goto(`${window.location}/${createdId}`);
      notify(`New Deploy: ${deployName}`, 2000);
    } else {
      notify("There was an issue creating a deploy.");
    }
  }
</script>

<style>
  .deploy-form {
    padding: 1em 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<PageTitle title="Deploys">Deploys</PageTitle>

<Collapsible disabled={isLoadingDeploys}>
  <h3 slot="title">Deploy Status</h3>
  <div slot="content">
    {#if isLoadingDeploys}
      <p>Loading...</p>
    {:else if hasActiveDeploy}
      <p>A deploy is active.</p>
    {:else}
      <p>No active deploy.</p>
    {/if}

  </div>
</Collapsible>

<Collapsible collapsed={false} disabled={isLoadingDeploys}>
  <h3 slot="title">New Deploy</h3>
  <div slot="content">
    <p>
      A deploy will push any currently published guides to the public website.
    </p>

    <form
      class="deploy-form"
      on:submit|preventDefault={createDeploy}
      disabled={hasActiveDeploy}>

      <label>
        Deploy Label
        <input
          type="text"
          name="deploy-label"
          placeholder="Enter a name"
          bind:value={deployName} />
      </label>
      <button type="submit" disabled={!isDeployable}>Start</button>
    </form>
  </div>

</Collapsible>

<Collapsible>
  <h3 slot="title">Deploy History</h3>
  <div slot="content">
    <div class="actions">
      <button type="button">Refresh</button>
    </div>
    {#if isLoadingDeploys}
      <p>Loading...</p>
    {:else}
      <DeployHistory {deploys} />
    {/if}
  </div>
</Collapsible>
