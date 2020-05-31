
<style>


  .layout {
    --content-width: 46rem;
    display: block;
  }
  main {
    width: 100%;
    padding: 2em 2em;
  }


  @media screen and (min-width: 56em) {
    .layout {
      display: flex;
      justify-content: space-between;
      flex: 0 1 auto;
    }

    main {
      max-width: var(--content-width);
      border-top: none;
      padding: 10vh 0;
      margin: 0 auto;
      min-height: 100vh;
    }

    nav {
      position: sticky;
      top: 0em;
      height: 100vh;
      width: 12em;
      background-color: var(--nav-background-color);
      color: var(--nav-color);
    }
  }

</style>

<div class="layout">
  <nav>
    <slot name="sidebar"></slot>
  </nav>
  <main>
    <slot name="content"></slot>
  </main>

</div>
