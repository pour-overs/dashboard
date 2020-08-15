<script>
  import Collapsible from "@components/Collapsible.svelte";

  export let deploys = [];
</script>

<style>

  .deploy-list {
    list-style: none;
    padding: 0 0;
    margin: 1em 0;
  }
</style>

<p>There has been a total of {deploys.length} deploys.</p>

<ol class="deploy-list">
  {#each deploys as deploy}
    <li>
      {deploy.label}
    </li>
  {:else}
    <li class="empty">No deploys yet.</li>
  {/each}
</ol>

