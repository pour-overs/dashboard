<style>
  .sidebar {
    padding: 1em 1em;
    position: sticky;
    top: 0;
    border: 1px solid var(--border-color);
    height: 100%;
  }
</style>

<aside class:sidebar={true}>
  <slot />
</aside>
