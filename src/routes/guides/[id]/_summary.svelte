<script>
  import { buildSummary } from "@services/summary.js";
  import SimpleGraph from "./_simplegraph.svelte";

  export let steps = [];
  export let coffee = null;

  let summary = null;

  $: if (steps.length > 0 && coffee && typeof coffee.amount !== "undefined" && coffee.amount > 0) {
    summary = buildSummary(steps, coffee);
  }
</script>

<style>
  dl {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  dt {
    font-weight: 600;
  }
</style>

{#if summary !== null}
  <div>
    <SimpleGraph data={summary.timeline} />
    <h4>Totals</h4>
    <dl>
      <dt>Total Steps</dt>
      <dd>{summary.totalSteps}</dd>
      <dt>Total Duration</dt>
      <dd>
        {summary.humanReadable.time}
        <span class="measurement">m:s</span>
      </dd>
      <dt>Total Dose</dt>
      <dd>
        {summary.totalDose}
        <span class="measurement">grams</span>
      </dd>
      <dt>Ratio</dt>
      <dd>
        {summary.ratio}
        <span class="measurement">coffee:water</span>
      </dd>
    </dl>

    <h4>Water to Step distribution</h4>
    <ol class="water">
      {#each summary.waterDistribution as point}
        <li>
          {point.label} pours {point.value} of
          total water.
        </li>
      {/each}
    </ol>
  </div>
{:else}
  <p>More information is needed for a valid summary.</p>
{/if}
