<script>
  import Icon from "@components/Icon.svelte";
  import Collapsible from "@components/Collapsible.svelte";
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

  function deleteStep() {
    dispatch("delete", { id });
  }

  function changed() {
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
    margin-bottom: 1em;
  }

  .step-title {
    font-weight: 600;
    display: flex;
    align-items: center;
    width: 100%;
    padding-right: 1em;
  }

  .step-title h3 {
    margin: 0 0;
  }

  .step-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    color: var(--color4);
  }

  .orderer button[disabled] {
    opacity: 0.5;
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
    padding: 0.5em 0.5em 0.5em 0;
  }

  textarea,
  input,
  select {
    display: block;
    width: 100%;
    padding: 0.25em 0.25em;
    resize: vertical;
  }

  footer {
    text-align: right;
    padding: 0.25em 0.5em;
  }

  .help {
    width: auto;
    font-size: 0.8em;
    padding: 0.25em 0.5em;
    background-color: var(--color3);
    color: var(--color1);
    display: block;
    border-radius: 3px;
    margin: auto 1em;
  }

  .measurement {
    display: inline-block;
    background-color: var(--color3);
    font-size: 0.75em;
    padding: 0.25em 0.5em;
    border-radius: 6px;
    color: #888;
    margin: auto 0.5rem;
  }
</style>

<div class="step" data-id={id}>
  <Collapsible padded={false}>

    <header class="step-title" slot="title">
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
    <div slot="content">

      <footer>
        <button type="button" on:click={deleteStep}>Delete Step</button>
      </footer>

      <form on:change={changed} on:submit={changed} on:input={changed} class="step-body">

        <label>
          Order
          <input type="number" name="order" disabled value={order} />
        </label>
        <p class="help">
          When this step should take place. Starts counting at 0.
        </p>

        <label>
          Title
          <input bind:value={title} type="text" name="title" />
        </label>
        <p class="help">The name of this step.</p>

        <label>
          Instruction
          <textarea bind:value={description} name="description" rows="5" />
        </label>
        <p class="help">
          A sentence or two of what the user should do during this step.
        </p>

        <label>
          Dose
          <span class="measurement">grams</span>
          <input bind:value={dose} type="number" name="dose" placeholder="" />
        </label>
        <p class="help">
          The total amount of water poured during this step, in grams.
        </p>

        <label>
          Duration
          <span class="measurement">seconds</span>
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
          <span class="measurement">seconds</span>
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
          <br />
          <strong>Continuous</strong>
          means the pour was performed until the dose was reached, while
          <strong>pulse</strong>
          means to cycle between short pauses and pours.
        </p>

      </form>
    </div>

  </Collapsible>

</div>
