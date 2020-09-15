<script>
  import Collapsible from "@components/Collapsible.svelte";
  import Icon from "@components/Icon.svelte";
  import DateTime from "@components/DateTime.svelte";

  /** @type {List<IBuild>} 
    https://googleapis.dev/nodejs/cloudbuild/latest/google.devtools.cloudbuild.v1.IBuild.html 
  */
  export let deploys = [];

  export const STATUS = {
    UNKNOWN:    "UNKNOWN",
    QUEUED:     "QUEUED",
    WORKING:    "WORKING",
    SUCCESS:    "SUCCESS",
    FAILURE:    "FAILURE",
    ERROR:      "ERROR",
    TIMEOUT:    "TIMEOUT",
    CANCELLED:  "CANCELLED",
  };

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
    margin: 0 0 1em 0;
    display: grid;
    grid-template-columns: 2em 1fr 1fr 6em;
    grid-column-gap: 1em;
    text-decoration: none;
    align-items: center;
  }

  .time {
    color: var(--body-color);
  }

  .deploy:hover {
    border: 1px solid var(--link-color--hover);
  }

  .title {
    font-weight: 600;
    color: var(--color3);
  }

  .build-id {
    color: var(--link-color);
    font-family: var(--font-monospace);
    display: block;
    opacity: 0.5;
    font-size: 0.7em;
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


</style>

<p>There has been {deploys.length} deploy{deploys.length === 1 ? '' : 's'}.</p>

<ol class="deploy-list">

  {#each deploys as deploy, index}
    <li>
      <a class="deploy" href={`/deploys/${deploy.id}`}>

        <div class="deploy-icon">
          {#if deploy.status === STATUS.SUCCESS}
            <Icon name="cloud_done" color="var(--color3)" />
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
          <div class="build-id">
            {deploy.id}
          </div>
        </div>

        <div class="time">
          {#if deploy.status === STATUS.SUCCESS}
            Completed on
            <DateTime date={new Date(deploy.finishTime.date)} />
          {:else}
            Started on
            <DateTime date={new Date(deploy.createTime.date)} />
          {/if}
        </div>

        <div class="build-index">
          {deploys.length - index}
        </div>

      </a>
    </li>
  {:else}
    <li class="empty">No deploys yet.</li>
  {/each}
</ol>
