<script>
  import Collapsible from "@components/Collapsible.svelte";
  import Icon from "@components/Icon.svelte";

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
  }

  .deploy a {
    display: inline-block;
    padding-left: 1em;
  }
</style>

<p>There has been {deploys.length} deploy{deploys.length === 1 ? '' : 's'}.</p>

<ol class="deploy-list">
  {#each deploys as deploy}
    <li class="deploy">
      <header>
        <Icon
          name={deploy.isComplete ? 'cloud_done' : 'cloud_queue'}
          color="var(--color4)" />
        <a href={`/deploys/${deploy.id}`}>{deploy.label}</a>
        {#if !deploy.isComplete}
          <span class="measurement">Active</span>
        {/if}
      </header>

    </li>
  {:else}
    <li class="empty">No deploys yet.</li>
  {/each}
</ol>
