<script>
  import Collapsible from "@components/Collapsible.svelte";
  import Icon from "@components/Icon.svelte";
  import DateTime from "@components/DateTime.svelte";

  export let deploys = [];
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
    grid-template-columns: 2em auto 1fr;
    grid-column-gap: 1em;
  }

  .deploy a {

  }

</style>

<p>There has been {deploys.length} deploy{deploys.length === 1 ? '' : 's'}.</p>

<ol class="deploy-list">
  {#each deploys as deploy}
    <li class="deploy">

        {#if deploy.isComplete}
          <Icon name="cloud_done" color="var(--color4)" />
        {:else}
          <span class="loading-spinner">
            <Icon name="sync" color="var(--color4)" />
          </span>
        {/if}

        <a href={`/deploys/${deploy.id}`}>{deploy.label}</a>

        <div class="time">
          {#if deploy.isComplete}
            Completed at
            <DateTime date={new Date(deploy.lastModified.date)} />
          {:else}
            Started at
            <DateTime date={new Date(deploy.createdAt.date)} />
          {/if}
        </div>

    </li>
  {:else}
    <li class="empty">No deploys yet.</li>
  {/each}
</ol>
