<script>
  import { slide } from "svelte/transition";
  import Icon from "./Icon.svelte";

  export let collapsed = true;

  function toggle() {
    collapsed = !collapsed;
  }

  $: icon = collapsed ? "chevron_left" : "expand_more";

</script>

<style>

  .collapsible {
    padding: 0.25em 0.5em;
    border: 1px solid #eee;
    border-radius: 3px;
    margin-bottom: 0.5em;
  }

  .title {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 1em;
    margin: -0.25em -0.5em -0.25em -0.5em;
  }

  .title.open {
    border-bottom: 1px solid #eee;
  }

  .title:hover {
    background-color: rgba(0,0,0,0.05);
  }

  .content {
    border: 1px solid transparent;
    padding: 0.5em 0.5em;
  }
</style>

<section class="collapsible">
  <header class="title" class:open={!collapsed} on:click={toggle}>
    <slot name="title" />
    <Icon name={icon} />
  </header>
  {#if !collapsed}
    <div class="content" transition:slide={{ duration: 250 }}>
      <slot name="content"/>
    </div>
  {/if}
</section>