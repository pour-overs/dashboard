<script>
  export let segment;
</script>

<style>
  .nav-items {
    list-style: none;
    display: flex;
    padding: 0.5em;
    margin: 0 0;
    justify-content: space-evenly;
  }

</style>

<nav>
  <ul class="nav-items">
    <li>
      <a
        aria-current={segment === undefined ? 'index' : undefined}
        href="guides">
        View Guides
      </a>
    </li>
    <li>
      <a
        aria-current={segment === "create" ? 'create' : undefined}
        href="/guides/create">
        Create Guide
      </a>
    </li>
  </ul>

</nav>


<slot />