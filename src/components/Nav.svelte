<script>
  export let segment;
</script>

<style>
  .logo {
    text-align: center;
    padding: 1em 2em;
  }

  .nav-items {
    display: flex;
    flex-flow: row wrap;
    list-style: none;
    margin: 0 auto;
    justify-content: center;
    padding: 0 0;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 2em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 0.5em 1em;
    display: block;
  }
</style>

<nav>
  <div class="logo">Pour Over Guides</div>
  <ul class="nav-items">
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        Home
      </a>
    </li>
    <li>
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
        About
      </a>
    </li>
    <li>
      <a aria-current={segment === 'guides' ? 'page' : undefined} href="guides">
        Guides
      </a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
         the blog data when we hover over the link or tap it on a touchscreen -->
    <!-- <li><a rel=prefetch aria-current='{segment === "blog" ? "page" : undefined}' href='blog'>blog</a></li> -->
  </ul>
</nav>
