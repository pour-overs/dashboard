<script>

  export let segment;

  import IconProvider from "@providers/IconProvider.svelte";
  import Icon from "@components/Icon.svelte";
  import routes from "@config/nav.config.js";

  const defaultSegment = routes[0].segment;
  const isActive = (current, route) => current === route;

</script>

<style>

  .nav-items {
    padding: 0.5em 0;
    margin: 0 0;
    display: flex;
    justify-content: space-evenly;
    flex: 1 0 auto;
    align-items: center;
    list-style: none;
  }

  .icon {
    display: inline-block;
    padding-top: 4px;
  }

  .text {
    display: none;
  }

  [aria-current] {
    background-color: var(--selectable-bg);
  }

  .nav-items a {
    text-align: center;
    color: var(--nav-color);
    font-weight: 200;
    text-decoration: none;
    padding: 0.5em 1em;
    display: block;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .nav-items a:hover {
    background-color: rgba(255, 255, 255, 0.15);
    color: var(--nav-color);
  }


  @media (min-width: 56em) {

    nav {
      display: flex;
      width: 100%;
      flex-flow: column nowrap;
      height: 100vh;
      flex: 1 0 auto;
      align-items: stretch;
    }

    .nav-items {
      display: block;
      margin: 0em auto;
      padding: 0 0;
      width: 100%;
    }

    .nav-items a {
      text-align: left;
    }

    .text {
      display: inline;
    }

    .icon {
      margin-right: 1em;
    }
  }
</style>

<IconProvider color="var(--nav-icon-color)" size="16">
  <nav>
    <ul class="nav-items">
      {#key segment}
        {#each routes as route}
          <li>
            <a aria-current={isActive(segment || defaultSegment, route.segment) ? 'page' : undefined} href={route.segment}>
              <span class="icon">
                <Icon name={route.icon} />
              </span>
              <span class="text">{route.label}</span>
            </a>
          </li>
        {/each}
      {/key}
    </ul>
  </nav>
</IconProvider>
