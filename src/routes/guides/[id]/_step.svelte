<script>
  import Icon from "@components/Icon.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let id;
  export let order;
  export let title;
  export let description;
  export let dose;
  export let duration;
  export let drainDuration;
  export let pour;

  export let max;

  function moveUp() {
    dispatch("move", { previous: order, next: order - 1 });
  }

  function moveDown() {
    dispatch("move", { previous: order, next: order + 1 });
  }

  function saveChanges() {
    dispatch("change", {
      order,
      title,
      description,
      dose,
      duration,
      drainDuration,
      pour
    });
  }
</script>

<style>
  .step {
    border: 1px solid #eee;
    margin-bottom: 1em;
  }

  .step-title {
    background-color: #f2f2f2;
    font-weight: 600;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    width: 100%;
  }

  .step-title h3 {
    margin: 0 0;
  }

  .step-body {
    padding: 1em 1em;
  }

  .orderer {
    display: flex;
    flex-flow: column nowrap;
    margin-right: 0.5em;
    padding: 0.25em 0.25em;
  }

  .orderer button {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0.25em 0.25em;
  }

  .orderer button[disabled]:hover {
    background: transparent;
    cursor: cursor;
  }

  .orderer button:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  label {
    display: block;
    margin-top: 0.5em;
  }

  .help {
    width: auto;
    color: #fff;
    font-size: 0.8em;
    padding: 0.25em 0.5em;
    background-color: var(--color1);
    width: auto;
    display: none;
    border-radius: 3px;
  }

  .show-help .help {
    display: inline-block;
  }
</style>

<div class="step" data-id={id}>
  <header class="step-title">
    <div class="orderer">
      <button type="button" on:click={moveUp} disabled={order === 0}>
        <Icon name="keyboard_arrow_up" />
      </button>

      <button type="button" on:click={moveDown} disabled={order === max}>
        <Icon name="keyboard_arrow_down" />
      </button>
    </div>

    <h3>{title}</h3>
    <button>Delete (todo)</button>

  </header>

  <form
    on:change={saveChanges}
    on:submit={saveChanges}
    class="step-body"
    class:show-help={order === 0}>
    <label>
      Order
      <input type="number" name="order" disabled value={order} />
    </label>
    <p class="help">When this step should take place. Starts at 0.</p>

    <label>
      Title
      <input bind:value={title} type="text" name="title" />
    </label>
    <p class="help">The name of this step.</p>

    <label>
      Instruction
      <input bind:value={description} type="text" name="description" />
    </label>
    <p class="help">
      A sentence or two of what the user should do during this step.
    </p>

    <label>
      Dose
      <input bind:value={dose} type="number" name="dose" placeholder="" />
    </label>
    <p class="help">
      The total amount of water poured during this step, in grams.
    </p>

    <label>
      Duration
      <input
        type="number"
        bind:value={duration}
        name="duration"
        placeholder="10"
        min="1" />
    </label>
    <p class="help">The amount of time the dose should be poured for.</p>

    <label>
      Drain Duration
      <input
        bind:value={drainDuration}
        type="number"
        name="drainDuration"
        placeholder="10"
        min="0"
        max="36000" />
    </label>
    <p class="help">
      The amount of time to allow the pour to drain before the next step.
    </p>

    <label>
      Pour Technique
      <select name="pour" bind:value={pour}>
        <option disabled="disabled" selected>Select a Pour Style</option>
        <option value="continuous">Continuous</option>
        <option value="pulse">Pulse</option>
      </select>
    </label>
    <p class="help">
      The technique or style that the water should be poured with.
      <strong>Continuous</strong>
      means the pour was done until the dose was reached, while
      <strong>pulse</strong>
      means to have short pauses and pours.
    </p>

  </form>

</div>
