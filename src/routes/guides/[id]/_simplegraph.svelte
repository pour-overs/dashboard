<script>
  export let width = 260;
  export let height = 80;
  export let data;

  function scale(domain, range) {
    const m = (range[1] - range[0]) / (domain[1] - domain[0]);
    return num => range[0] + m * (num - domain[0]);
  }

  $: x = scale([0, Math.max(...data.map(d => d.time))], [0, width]);
  $: y = scale(
    [0, Math.max(...data.map(d => d.accumulatedDose))],
    [height, 0]
  );

  $: points = data.map(d => `${x(d.time)},${y(d.accumulatedDose)}`).join(" ");
</script>

<style>
  polyline {
    vector-effect: non-scaling-stroke;
  }

  .graph {
    position: relative;
  }

  .x-axis,
  .y-axis {
    font-size: 0.8em;
    font-family: monospace;
  }

  .x-axis {
    position: absolute;
    left: calc(50% - 2em);
    bottom: 1em;
  }

  .y-axis {
    position: absolute;
    left: 1em;
    bottom: calc(50% - 2em);
    transform: rotate(-90deg);
    transform-origin: 0 center;
  }

  svg {
    border: 1px solid var(--selectable-bg--hover);
    padding: 1em 0 0 0;
    width: 100%;
    margin: 0.5em auto;
  }
</style>

{#if data}
  <div class="graph">

    <svg viewbox={`0 0 ${width} ${height}`}>
      <polyline {points} fill="none" stroke="var(--color5)" />
    </svg>
    <div class="x-axis">Time (s)</div>
    <div class="y-axis">Poured Water (g)</div>
  </div>
{:else}
  <p>No data.</p>
{/if}
