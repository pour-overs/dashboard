<script context="module">
  export async function preload({ host, path, params, query }, session) {
    const { id } = params;
    const response = await this.fetch(`/api/guides/${id}`, {
      credentials: "include",
      method: "GET"
    });

    if (response.ok) {
      const guide = await response.json();

      return { guide };
    }
  }
</script>

<script>
  import Icon from "@components/Icon.svelte";
  import Step from "./_step.svelte";
  import { flip } from 'svelte/animate';
  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { createEventDispatcher } from "svelte";
  import { saveGuide } from "./_guides.js";
  import { notify } from "@stores/notifications.js";

  const dispatch = createEventDispatcher();

  export let guide;
  export let steps = guide.steps || [];

  let hasChanged = false;

  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: t => `
          transform: ${transform} scale(${t});
          opacity: ${t}
        `
      };
    }
  });

  function addEmptyStep() {
    if (steps.length < 100) {
      const step = createStep(steps.length);
      steps = [...steps, step];
      hasChanged = true;
    }
  }

  function createStep(order) {
    return {
      id: order,
      title: `Step ${order + 1}`,
      order,
      description: "",
      dose: 0,
      duration: 1,
      drainDuration: 0,
      pour: "continuous", // pulse|continuous
    };
  }

  function onMove(e) {
    const { next, previous } = e.detail;

    if (next >= steps.length || next < 0) return;

    steps[next].order = previous;
    steps[previous].order = next;

    steps = steps
      .map( a => a)
      .sort( (a, b) => {
        if (a.order < b.order) return -1;
        if (b.order < a.order) return 1;
      });

      hasChanged = true;
  }

  function onStepChanged(e) {
    const step = e.detail;
    const  { id } = steps[step.order];
    steps[step.order] = { id, ...step };
    hasChanged = true;
  }

  async function saveChanges() {
    await saveGuide(guide.id, { steps });
    notify(`${guide.title}'s steps have been saved.`, 2000);
  }

</script>

<style>
  .steps {
    list-style: none;
    padding: 0 0;
    margin: 1em 0;
  }

  .actions {
    position: sticky;
    top: 0rem;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 1em 1em;
    border: 1px solid #eee;
    margin-bottom: 2em;
    background-color: #fff;
  }
</style>

<h1>Edit Steps for <strong>{guide.title}</strong></h1>

<header class="actions">
  <a href={`/guides/${guide.id}`}>Return to editing <strong>{guide.title}</strong>'s details</a>
  <button type="button" disabled={!hasChanged} on:click={saveChanges}>Save Changes</button>
  <button type="button" on:click={addEmptyStep}>Add Step</button>
</header>

<ol class="steps">
  {#each steps as step (step.id)}
    <li class="step"
      in:receive={{key: step.id}}
      out:send={{key: step.id}}
      animate:flip={{ duration: 500 }}
    >
      <Step {...step} max={steps.length - 1} on:move={onMove} on:change={onStepChanged} />
    </li>
  {:else}
    <li>
      <p>There are no steps.</p>
    </li>
  {/each}
</ol>
