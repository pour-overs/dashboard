<script context="module">
  export async function preload(page, session) {
    const { user, isAuthorized } = session;
    return { user, isAuthorized };
  }
</script>

<script>
  import { notify } from "@stores/notifications.js";
  import Nav from "@components/Nav.svelte";
  import Notifications from "@components/Notifications.svelte";
  import SidebarLayout from "./_SidebarLayout.svelte";
  import UserProvider from "@providers/UserProvider.svelte";
  import ThemeProvider from "@providers/ThemeProvider.svelte";
  import IconProvider from "@providers/IconProvider.svelte";

  export let user = null;
  export let isAuthorized = false;
  export let segment;

  let isOnline = true;

  let wentOffline = false;
  $: if (!isOnline) {
    wentOffline = true;
    notify("You appear to be offline.", null);
  }

  $: if (isOnline && wentOffline) {
    wentOffline = false;
    notify("You're online again!");
  }
</script>

<svelte:window bind:online={isOnline} />

{#if !isAuthorized}
  <main>
    <slot />
  </main>
{:else}
  <ThemeProvider>
    <IconProvider size="24" color="var(--body-color)">
      <UserProvider {user} {isAuthorized}>
        <SidebarLayout>

          <nav slot="sidebar">
            <Nav {segment} />
          </nav>

          <main slot="content">
            <slot />
          </main>

        </SidebarLayout>
      </UserProvider>
    </IconProvider>
  </ThemeProvider>
{/if}

<Notifications />
