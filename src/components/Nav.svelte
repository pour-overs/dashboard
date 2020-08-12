<script>
  export let segment;
  import { getContext } from "svelte";

  import IconProvider from "@providers/IconProvider.svelte";
  import Icon from "@components/Icon.svelte";

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
      <li>
        <a aria-current={segment === undefined ? 'page' : undefined} href=".">
          <span class="icon">
            <Icon name="equalizer" />
          </span>
          <span class="text">Dashboard</span>
        </a>
      </li>
      <li>
        <a
          aria-current={segment === 'guides' ? 'page' : undefined}
          href="guides">
          <span class="icon">
            <Icon name="library_books" />
          </span>
          <span class="text">Guides</span>
        </a>
      </li>
      <li>
        <a aria-current={segment === 'users' ? 'page' : undefined} href="users">
          <span class="icon">
            <Icon name="recent_actors" />
          </span>
          <span class="text">Users</span>
        </a>
      </li>
      <li>
        <a aria-current={segment === 'account' ? 'page' : undefined} href="account">
          <span class="icon">
            <Icon name="account_box" />
          </span>
          <span class="text">Account</span>
        </a>
      </li>
      <li>
        <a aria-current={segment === 'deploys' ? 'page' : undefined} href="deploys">
          <span class="icon">
            <Icon name="cloud_done" />
          </span>
          <span class="text">Deploys</span>
        </a>
      </li>
    </ul>
  </nav>
</IconProvider>
