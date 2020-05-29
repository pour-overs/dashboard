<script>
  export let segment;
  import { getContext } from "svelte";
  import UserCard from "./UserCard.svelte";

  import IconProvider from "../providers/IconProvider.svelte";

  import EqualizerIcon from "../icons/EqualizerIcon.svelte";
  import LibraryBooksIcon from "../icons/LibraryBooksIcon.svelte";
  import RecentActorsIcon from "../icons/RecentActorsIcon.svelte";

  const user = getContext("user");
</script>

<style>
  nav {
    display: flex;
    width: 100%;
    flex-flow: column nowrap;
    height: 100vh;
    flex: 1 0 auto;
    align-items: stretch;
  }

  .logo {
    font-weight: 200;
    font-size: 1.5rem;
    padding: 2rem 2rem;
    text-align: center;
    margin: 0 0;
  }

  .icon {
    display: inline-block;
    margin-right: 1em;
    padding-top: 4px;
  }

  .nav-items {
    display: block;
    list-style: none;
    margin: 0em auto;
    padding: 0 0;
    width: 100%;
  }

  .auth-items {
    margin-top: auto;
  }

  [aria-current] {
    background-color: rgba(255, 255, 255, 0.1);
  }

  a {
    text-decoration: none;
    padding: 0.5em 1em;
    display: block;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  a:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>

<IconProvider color="var(--color2)" size="16">
  <nav>
    <ul class="nav-items">
      <li>
        <a aria-current={segment === undefined ? 'page' : undefined} href=".">
          <span class="icon">
            <EqualizerIcon />
          </span>
          Dashboard
        </a>
      </li>
      <li>
        <a
          aria-current={segment === 'guides' ? 'page' : undefined}
          href="guides">
          <span class="icon">
            <LibraryBooksIcon />
          </span>
          Guides
        </a>
      </li>
      <li>
        <a aria-current={segment === 'users' ? 'page' : undefined} href="users">
          <span class="icon">
            <RecentActorsIcon />
          </span>
          Users
        </a>
      </li>
    </ul>

    <div class="auth-items">
      <UserCard {...user} text="Your Account" />
    </div>
  </nav>
</IconProvider>
