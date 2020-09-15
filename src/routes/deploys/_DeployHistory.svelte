<script>
  import Collapsible from "@components/Collapsible.svelte";
  import Icon from "@components/Icon.svelte";
  import DateTime from "@components/DateTime.svelte";
  import { STATUS } from "./_deploy-status.js";

  /** @type {List<IBuild>} 
    https://googleapis.dev/nodejs/cloudbuild/latest/google.devtools.cloudbuild.v1.IBuild.html 
  */
  export let deploys = [];

  export let displayFailedBuilds = true;
  export let displayUnknownBuilds = true;

  $: deployList = deploys.filter( d => {
    
    if (d.status === STATUS.UNKNOWN && !displayUnknownBuilds) {
      return false;
    }

    if (d.status === STATUS.FAILURE && !displayFailedBuilds) {
      return false;
    }
    
    return true;
  });

</script>

<style>
  .deploy-list {
    list-style: none;
    padding: 0 0;
    margin: 1em 0;
  }

  .deploy {
    border: 1px solid var(--border-color);
    padding: 1em 1em;
    display: grid;
    grid-template-columns: 2em 1fr 1fr 6em;
    grid-column-gap: 1em;
    text-decoration: none;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .time {
    color: var(--body-color);
  }

  .time p {
    margin: 0 0;
  }

  .deploy:hover {
    border: 1px solid var(--link-color--hover);
  }

  .title {
    font-weight: 600;
    color: var(--body-color);
  }

  .detail {
    color: var(--body-color);
    font-family: var(--font-monospace);
    display: block;
    opacity: 0.5;
    font-size: 0.7em;
  }

  .build-id {
    color: var(--link-color);
  }

  .build-index {
    font-family: var(--font-monospace);
    font-weight: 800;
    text-align: right;
    text-transform: uppercase;
  }

  .build-index::before {
    opacity: 0.5;
    color: var(--link-color);
    font-weight: 400;
    content: "build";
    font-size: 0.7em;
    display: block;
    line-height: 1em;
  }

  .deploy--hover {
    opacity: 0;
    height: 0;
    padding: 0 0.5rem;
    color: var(--body-color);
    transition: 0.1s ease-in-out all;
    margin-bottom: 0.5rem;
  }

  .deploy:hover .deploy--hover {
    opacity: 1;
    height: 1em;
    transition: 0.1s ease-in-out all;
  }
</style>

<p>There has been {deploys.length} deploy{deploys.length === 1 ? '' : 's'}.</p>

<ol class="deploy-list">

  {#each deployList as deploy, index}
    <li>
      <a class="deploy" href={deploy.url} target="_blank">

        <div class="deploy-icon">
          {#if deploy.status === STATUS.SUCCESS}
            <Icon name="cloud_done" color="var(--link-color--hover)" />
          {:else if deploy.status === STATUS.QUEUED || deploy.status === STATUS.WORKING}
            <span class="loading-spinner">
              <Icon name="sync" color="var(--color4)" />
            </span>
          {:else}
            <Icon name="error_outline" color="var(--color1)" />
          {/if}
        </div>

        <div class="title">
          {deploy.name} 
          <span class="deploy--hover"><Icon name="open_in_new" size="16" /></span>
          <div class="detail build-id">
            {#if deploy.status === STATUS.FAILURE && deploy.statusDetail.length > 0}
              Reason: {deploy.statusDetail}
            {:else}
              {deploy.id}
            {/if}
          </div>
        </div>


        <div class="time detail">
          
          <div><strong>Status:</strong> {deploy.status}</div>

          {#if deploy.status === STATUS.QUEUED || deploy.status === STATUS.WORKING}
            <p>
              <strong>Started:</strong>
              <DateTime date={new Date(deploy.createTime.date)} />
            </p>
          {:else}
            <p>
              <strong>Finished:</strong>
              <DateTime date={new Date(deploy.finishTime.date)} />
            </p>
          {/if}
        </div>

        <div class="build-index">{deploys.length - index}</div>
      </a>
    </li>
  {:else}
    <li class="empty">No deploys yet.</li>
  {/each}
</ol>
