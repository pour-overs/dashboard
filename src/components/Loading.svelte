<script>
  export let text = "Loading";
  export let size = 50;
  export let speed = 750;
  export let color = "var(--color1)";
  export let thickness = 3;
  export let gap = 40;
  export let radius = 10;
  let dash;
  $: dash = (2 * Math.PI * radius * (100 - gap)) / 100;
</script>

<style>

  .loading {
    display: grid;
    align-self: center;
    place-content: center;
    background-color: rgba(0,0,0,0.05);
    padding: 1rem 1rem;
    margin: 1rem 1rem;
    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 3px;
    height: 100%;
    color: var(--button-color--disabled);
  }

  .svelte-spinner {
    transition-property: transform;
    animation-name: svelte-spinner_infinite-spin;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    margin: 0 auto;
  }
  @keyframes svelte-spinner_infinite-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<div class="loading">

  <svg
    height={size}
    width={size}
    style="animation-duration:{speed}ms;"
    class="svelte-spinner"
    viewbox="0 0 32 32">
    <circle
      role="presentation"
      cx="16"
      cy="16"
      r={radius}
      stroke={color}
      fill="none"
      stroke-width={thickness}
      stroke-dasharray="{dash},100"
      stroke-linecap="round" />
  </svg>
  {#if text !== null}
    <p>{text}</p>
  {/if}
</div>
