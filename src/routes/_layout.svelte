<script context="module">
  export async function preload(page, session) {
    const { user, isAuthorized } = session;
    console.log(user, isAuthorized);
    return { user, isAuthorized };
  }
</script>

<script>
  import Nav from "../components/Nav.svelte";
  import SidebarLayout from "./_SidebarLayout.svelte";
  import UserProvider from "../providers/UserProvider.svelte";

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
</style>

{#if !isAuthorized}
  <main>
    <slot />
  </main>
{:else}
  <UserProvider {user}>
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
