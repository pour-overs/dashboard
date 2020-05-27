<script>
  export let segment;
</script>

<style>
  .logo {
    font-weight: 200;
    font-size: 1.5rem;
    padding: 2rem 2rem;
    text-align: center;
    margin: 0 0;
  }

  .nav-items {
    list-style: none;
    margin: 0 auto;
    padding: 0 0;
  }

  [aria-current] {
    background-color: rgba(255,255,255,0.1);
  }

  a {
    text-decoration: none;
    padding: 0.5em 1em;
    display: block;
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    cursor: pointer;
  }

  a:hover {
    background-color: rgba(255,255,255,0.1);
  }
</style>

<nav>
  <h2 class="logo">Dashboard</h2>

  <ul class="nav-items">
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        Home
      </a>
    </li>
    <li>
      <a aria-current={segment === 'guides' ? 'page' : undefined} href="guides">
        Guides
      </a>
    </li>
  </ul>
</nav>
