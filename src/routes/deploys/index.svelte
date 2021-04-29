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
    return [];
  }
</script>

<script>
  import { Deferred } from "@utils";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { STATUS } from "./_deploy-status.js";

  import CreateDeploy from "./_CreateDeploy.svelte";
  import DeployHistory from "./_DeployHistory.svelte";
  import ActiveDeploy from "./_ActiveDeploy.svelte";
  import FirebaseProvider from "@providers/FirebaseProvider.svelte";
  import Warning from "@components/Warning.svelte";
  import PageTitle from "@components/PageTitle.svelte";
  import Collapsible from "@components/Collapsible.svelte";
  import Loading from "@components/Loading.svelte";

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
          activeDeploy = mostRecentDeploy.buildTriggerId;
        }
        else {
          activeDeploy = null;
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
    const { triggerId } = e.detail;
    activeDeploy = triggerId;
  }

  async function activeDeployCompleted() {
    notify("Deploy complete", 4000)
    activeDeploy = null;
    await reloadDeploys();
  }
</script>

<style>

  .deploy-history {
    grid-template-columns: 1fr minmax(8em, 20%);
  }

  .deploy-history-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .deploy-history-title .actions {
    text-align: right;
    margin-right: 2rem;
  }
</style>

<PageTitle title="Deploys">Deploys</PageTitle>




<Collapsible collapsed={!hasActiveDeploy}>
  <h3 slot="title">Active Deploy</h3>
  <div slot="content">
    <FirebaseProvider>
      {#if hasActiveDeploy}
        <ActiveDeploy id={activeDeploy} on:complete={activeDeployCompleted} />
      {:else}
        <p>Currently there isn't an active deploy.</p>
      {/if}
    </FirebaseProvider>

  </div>
</Collapsible>

<Collapsible disabled={isLoadingDeploys} collapsed={false}>
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
  <h3 slot="title" class="deploy-history-title">
      Deploy History
      <aside class="actions">
        <button type="button" on:click|stopPropagation={reloadDeploys}>Refresh</button>
      </aside>
  </h3>
  <div slot="content" class="deploy-history">

    <div>
      {#if isLoadingDeploys}
        <Loading text="Loading deploy history" />
      {:else}
        <DeployHistory {deploys} />
      {/if}
    </div>
  </div>
</Collapsible>
