<script>
  import { slide } from "svelte/transition";
  import Icon from "./Icon.svelte";

  export let collapsed = true;
  export let padded = true;

  function toggle() {
    collapsed = !collapsed;
  }

  $: icon = collapsed ? "chevron_left" : "expand_more";

</script>

<style>

  .collapsible {
    border: 1px solid var(--border-color);
    border-radius: 3px;
    margin-bottom: 0.5em;
  }

  .title {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0.5em;
    background-color: var(--selectable-bg);
  }

  .padded {
    padding: 0.5em 0.5em;
  }

  .title.open {
    border-bottom: 1px solid var(--border-color);
  }

  .title:hover {
    background-color: var(--selectable-bg--hover);
  }

  .content {
    border: 1px solid transparent;
    padding: 0.5em 0.5em;
  }
</style>

<section class="collapsible">
  <header class="title" class:open={!collapsed} on:click={toggle} class:padded >
    <slot name="title" />
    <Icon name={icon} />
  </header>
  {#if !collapsed}
    <div class="content" transition:slide={{ duration: 250 }}>
      <slot name="content"/>
    </div>
  {/if}
</section>