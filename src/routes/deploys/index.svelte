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
  import { STATUS } from "./_deploy-status.js";

  import CreateDeploy from "./_CreateDeploy.svelte";
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

  function initLoadDeploys() {
    isLoadingDeploys = true;
    return loadDeploys()
      .then(_deploys => {
        deploys = _deploys || [];
        console.log(deploys);
        
        let mostRecentDeploy = deploys[0] || null;
        if (mostRecentDeploy !== null && mostRecentDeploy.isActive) {
          activeDeploy = mostRecentDeploy;
        }

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

  async function deployStarted(e) {
    const { triggerID } = e.detail;
  }
</script>

<style>

  .deploy-history {
    grid-template-columns: 1fr minmax(8em, 20%);
  }

  .deploy-history .actions {
    padding: 0 0.5em;
    text-align: right;
    position: sticky;
    top: 0.5rem;
    right: 1rem;
    margin-right: 2rem;
    z-index: 1;
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
      <CreateDeploy on:deploy={deployStarted} />
    {/if}
  </div>

</Collapsible>

<Collapsible collapsed={false}>
  <h3 slot="title">Deploy History</h3>
  <div slot="content" class="deploy-history">
    <aside class="actions">
      <button type="button" on:click={reloadDeploys}>Refresh</button>
    </aside>
    <div>
      {#if isLoadingDeploys}
        <p>Loading...</p>
      {:else}
        <DeployHistory {deploys} />
      {/if}
    </div>
  </div>
</Collapsible>
