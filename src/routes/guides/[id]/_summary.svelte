<script>
  export let steps = [];

  $: totalTime = steps.reduce((t, s) => t + s.duration + s.drainDuration, 0);
  $: totalDose = steps.reduce((t, s) => t + s.dose, 0);

  $: humanReadable = {
    minutes: Math.floor(totalTime / 60),
    seconds: totalTime % 60,
    get time() { return `${humanReadable.minutes}:${humanReadable.seconds}` },
  }



</script>

<style>
  .measurement {
    display: inline-block;
    background-color: var(--color3);
    font-size: 0.75em;
    padding: 0.25em 0.5em;
    border-radius: 6px;
    color: #888;
    margin: auto 0.5rem;
  }

  dl {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  dt {
    font-weight: 600;
  }

</style>

<div>
  <dl>
    <dt>Total Steps</dt>
    <dd>{steps.length}</dd>
    <dt>Total Duration</dt>
    <dd>{humanReadable.time} <span class="measurement">m:s</span></dd>
    <dt>Total Dose</dt>
    <dd>{totalDose}<span class="measurement">grams</span></dd>
  </dl>

</div>

