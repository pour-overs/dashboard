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