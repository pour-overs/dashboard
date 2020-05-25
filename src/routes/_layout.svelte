<script context="module">
  export async function preload(page, session) {
    const { user, isAuthorized } = session;
    console.log(user, isAuthorized);
    return { user, isAuthorized };
  }
</script>


<script>
  import Nav from '../components/Nav.svelte';

  export let user = null;
  export let isAuthorized = false;
  export let segment;
  $: authText = isAuthorized ? "Sign-out" : "Sign-in";
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
    min-height: 90vh;
  }

  footer {
    padding: 1em 1em;
    background-color: #eee;
  }

  .text-right {
    text-align: right;
  }

  a {
    text-decoration: none;
  }

</style>

{#if segment !== "auth"}
  <Nav {segment}/>
{/if}

<main>
  <slot></slot>
</main>

{#if isAuthorized}
  <footer>
    <p class="text-right">
      <a href="/auth/login">{authText}</a>
    </p>

  </footer>
{/if}