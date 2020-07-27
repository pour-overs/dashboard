<script>
  export let title = "";
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<style>
  h1 {
    margin-bottom: 1em;
  }
</style>

<h1>
  <slot />
</h1>
