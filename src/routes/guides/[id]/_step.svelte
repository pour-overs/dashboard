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
    dispatch("move", { previous: order, next: order - 1});
  }

  function moveDown() {
    dispatch("move", { previous: order, next: order + 1});
  }

  function saveChanges() {
    dispatch("change", { order, title, description, dose, duration, drainDuration, pour });
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

  .step-title h3 { margin: 0 0; }

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
    background-color: rgba(0,0,0,0.1);
  }

  label {
    display: block;
    width: 100%;
    margin: 1em auto;
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

  </header>

  <form on:change={saveChanges} on:submit={saveChanges} class="step-body">
    <label>
      Order
      <input type="number" name="order" disabled value={order} />
    </label>

    <label>
      Title
      <input bind:value={title}
      type="text" name="title" />
    </label>

    <label>
      Description
      <input bind:value={description}
      type="text" name="description" />
    </label>

    <label>
      Dose
      <input bind:value={dose} type="number" name="dose" placeholder="" />
    </label>

    <label>
      Duration
      <input type="number" bind:value={duration} name="duration" placeholder="10" min="1" />
    </label>

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

  <label>
    Pour Style
    <select name="pour" bind:value={pour}>
      <option disabled="disabled" selected>Select a Pour Style</option>
      <option value="continious">Continious</option>
      <option value="pulse">Pulse</option>
    </select>
  </label>

  </form>

</div>
