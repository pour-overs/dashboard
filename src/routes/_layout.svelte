<script context="module">
  export async function preload(page, session) {
    const { user, isAuthorized } = session;
    return { user, isAuthorized };
  }
</script>

<script>
  import Nav from "@components/Nav.svelte";
  import Notifications from "@components/Notifications.svelte";
  import SidebarLayout from "./_SidebarLayout.svelte";
  import UserProvider from "@providers/UserProvider.svelte";

  export let user = null;
  export let isAuthorized = false;
  export let segment;
</script>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    /* https://coolors.co/937b63-141516-f2f4f6-27293e-f3b61f */
    --color1: #937b63;
    --color2: #141516;
    --color3: #f2f4f6;
    --color4: #27293e;
    --color5: #f3b61f;

    --nav-background-color: var(--color5);
    --nav-color: var(--color2);
  }

  :global(a:link, a[href]) {
    color: var(--color1);
    text-decoration: underline;
  }

  :global(a:link:hover, a[href]:hover) {
    color: var(--color4);
  }

  :global(button) {
    background-color: var(--color4);
    border: 1px solid var(--color4);
    color: #fff;
    padding: 0.25em 1em;
    border-radius: 3px;
    cursor: pointer;
  }

  :global(button:hover) {
    background-color: var(--color2);
    border: 1px solid var(--color1);
  }

  :global(button[disabled]) {
    background-color: var(--color3);
    border: 1px solid var(--color3);
    color: #888;
    cursor: not-allowed;
  }

</style>

{#if !isAuthorized}
  <main>
    <slot />
  </main>
{:else}
  <UserProvider {user} {isAuthorized} >
    <SidebarLayout>

      <nav slot="sidebar">
        <Nav {segment} />
      </nav>

      <main slot="content">
        <slot />
      </main>

    </SidebarLayout>
  </UserProvider>
{/if}

<Notifications />