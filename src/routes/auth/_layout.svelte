<script>
  export let segment;
  console.log(segment);
</script>

<style></style>

<svelte:head>
  <title>{segment}</title>
</svelte:head>
<main>
  <slot />
</main>
