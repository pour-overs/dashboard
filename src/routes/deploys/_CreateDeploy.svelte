<script context="module">
  import { notify } from "@stores/notifications.js";
  async function newDeploy(triggerId, branchName = "master") {
    const response = await fetch(`/api/deploys/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ branchName, triggerId })
    });

    if (!response.ok) {
      console.error(response);
      notify(response.statusText);
      return;
    }

    await response.json();

    return { triggerId, };
  }
</script>
<script>
  import { createEventDispatcher } from "svelte";
  import { cloudBuildTriggers, cloudBuildTargets, productionKey, dashboardKey } from "@config/app.config.js";
  import Warning from "@components/Warning.svelte";

  // don't display the dashboard as an option — there'd likely not be a point in it.
  const targets = Array.from(cloudBuildTriggers.keys());

  const dispatch = createEventDispatcher();

  const githubBranchesUrl =
    "https://github.com/pour-overs/guides-website/branches";
  const defaultBranch = "master";
  let branchName = "master";
  let selectedTarget = null;
  $: isDeployable = branchName.length >= 2 && selectedTarget !== null;
  $: selectedTargetName = selectedTarget === null ? "" :  cloudBuildTargets.get(selectedTarget);

  async function createDeploy() {
    notify(`Triggering a deploy to ${selectedTargetName}`, 4000);

    const { triggerId } = await newDeploy(selectedTarget, branchName);

    if (triggerId) {
      dispatch("deploy", { triggerId });
    } 
    else {
      notify("There was an issue creating a deploy.");
    }
  }
</script>

<style>
  .deploy-form {
    padding: 1em 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: flex-start;
  }

  .actions {
    text-align: right;
  }

  input,
  select {
    display: block;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }
</style>

<form class="deploy-form" on:submit|preventDefault={createDeploy}>

  <fieldset>

    <label>
      Branch to Deploy
      <input
        type="text"
        name="deploy-label"
        placeholder="Enter a name"
        bind:value={branchName} />
    </label>

    <a href={githubBranchesUrl} target="_blank">View branches on github</a>
  </fieldset>

  <fieldset>
    <label>
      Target
      <select bind:value={selectedTarget}>
        <option disabled selected>Select a target</option>
        {#each targets as target}
          <option value={cloudBuildTriggers.get(target)}>{target}</option>
        {/each}
      </select>
    </label>

  </fieldset>
  <div>
    {#if selectedTarget === cloudBuildTriggers.get(productionKey)}
      <Warning>This is a deploy to production.</Warning>
    {:else if selectedTarget === cloudBuildTriggers.get(dashboardKey)}
      <Warning>This is a deploy to the dashboard. Likely not needed.</Warning>
    {:else if branchName !== defaultBranch}
      <Warning>
        "{defaultBranch}" is the default branch — Verify the branch you typed exists
        <a href={githubBranchesUrl} target="_blank">on Github</a>
        .
      </Warning>
    {/if}

  </div>

  <fieldset class="actions">
    <button type="submit" disabled={!isDeployable}>
    {#if selectedTarget === null}
      Deploy to...
    {:else}
      Deploy to {selectedTargetName}
      {/if}
    </button>
  </fieldset>

</form>
