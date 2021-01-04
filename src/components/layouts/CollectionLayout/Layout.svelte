<script>
  export let sidebar = null;

  $: rightSidebar = sidebar === "right";
  $: leftSidebar = sidebar === "left";

</script>

<style>
  .collection-layout {
    display: block;
  }

  @media (min-width: 50em) {
    .collection-layout {
      display: grid;
      grid-template-columns: 1fr;
      align-items: flex-start;
      min-height: 50vh;
    }

    .with-right-sidebar {
      grid-template-columns: 1fr minmax(16rem, 25%);
    }

    .with-left-sidebar {
      grid-template-columns: auto 1fr;
    }
  }
</style>

<section class:collection-layout={true} class:with-right-sidebar={rightSidebar} class:with-left-sidebar={leftSidebar}>
  <slot />
</section>
