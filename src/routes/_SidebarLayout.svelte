
<style>


  .layout {
    --content-width: 46rem;
    display: block;
  }
  main {
    width: 100%;
    padding: 2em 1em;
  }


  @media screen and (min-width: 56em) {
    .layout {
      display: grid;
      grid-template-columns: minmax(14rem, 25%) 1fr;
      justify-content: space-between;
      flex: 0 1 auto;
    }

    main {
      border-top: none;
      padding: 5vh 2em;
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
