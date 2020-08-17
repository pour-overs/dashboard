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
  import Warning from "@components/Warning.svelte";
  import PageTitle from "@components/PageTitle.svelte";
  import Collapsible from "@components/Collapsible.svelte";

  let deploys = [];
  let loadingDeploys = new Deferred();
  let isLoadingDeploys = true;

  onMount(() => initLoadDeploys());

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

  function initLoadDeploys() {
    isLoadingDeploys = true;
    return loadDeploys()
      .then(_deploys => {
        deploys = _deploys || [];
        activeDeploy = deploys.find(d => !d.isComplete) || null;
        isLoadingDeploys = false;
        loadingDeploys.resolve(_deploys);
      })
      .catch(() => {
        notify("Could not load deploy data.", 5000);

        loadingDeploys.reject();
      });
  }

  async function reloadDeploys() {
    notify("Refreshing Deploys...");
    loadingDeploys = new Deferred();
    await initLoadDeploys();
    notify("Done", 1000);
  }
</script>

<style>
  .deploy-form {
    padding: 1em 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  form[disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  .deploy-history {
    display: grid;
    grid-template-columns: 1fr minmax(8em, 20%);
  }

  .deploy-history .actions {
    padding: 0 0.5em;
    text-align: right;
  }
</style>

<PageTitle title="Deploys">Deploys</PageTitle>

<Collapsible
  collapsed={isLoadingDeploys || hasActiveDeploy}
  disabled={isLoadingDeploys}>
  <h3 slot="title">New Deploy</h3>
  <div slot="content">

    <p>
      A deploy will push any currently published guides to the public website.
    </p>

    {#if hasActiveDeploy}
      <Warning>
        <strong>
          A new deploy cannot be created while another deploy is active.
        </strong>
        <br />
        Please wait for the current deploy to complete.
      </Warning>
    {:else}
      <form class="deploy-form" on:submit|preventDefault={createDeploy}>
        <label>
          Deploy Label
          <input
            disabled={hasActiveDeploy}
            type="text"
            name="deploy-label"
            placeholder="Enter a name"
            bind:value={deployName} />
        </label>
        <button type="submit" disabled={!isDeployable}>Start</button>
      </form>
    {/if}
  </div>

</Collapsible>

<Collapsible collapsed={false}>
  <h3 slot="title">Deploy History</h3>
  <div slot="content" class="deploy-history">
    <div>

      {#if isLoadingDeploys}
        <p>Loading...</p>
      {:else}
        <DeployHistory {deploys} />
      {/if}
    </div>
    <aside class="actions">
      <button type="button" on:click={reloadDeploys}>Refresh</button>
    </aside>
  </div>
</Collapsible>
