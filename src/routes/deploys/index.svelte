<script>
  import PageTitle from "@components/PageTitle.svelte";
  import Collapsible from "@components/Collapsible.svelte";

  let hasActiveDeploy = false;

  let deployName = "";
  $: isDeployable = deployName.length >= 2;

  async function createDeploy() {

  }
</script>

<style>
  .deploy-form {
    padding: 1em 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .deploy-list {
    list-style: none;
    padding: 0 0;
    margin: 1em 0;
  }
</style>

<PageTitle title="Deploys">Deploys</PageTitle>

<Collapsible collapsed={!hasActiveDeploy}>
  <h3 slot="title">Deploy Status</h3>
  <div slot="content">
    <p>No active deploys.</p>
  </div>
</Collapsible>

<Collapsible collapsed={false}>
  <h3 slot="title">New Deploy</h3>
  <div slot="content">
    <p>
      A deploy will push any currently published guides to the public website.
    </p>

    <form class="deploy-form" on:submit|preventDefault={createDeploy}>

      <label>
        Deploy Label
        <input type="text" name="deploy-label" placeholder="Enter a name" bind:value={deployName} />
      </label>
      <button type="submit" disabled={!isDeployable}>Start</button>
    </form>
  </div>

</Collapsible>

<Collapsible>
  <h3 slot="title">Deploy History</h3>
  <div slot="content">
    <ul class="deploy-list">
      <li>No deploys yet.</li>
    </ul>
  </div>
</Collapsible>
