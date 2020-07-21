<script context="module">
  export async function preload(page, session) {
    const { user, isAuthorized } = session;
    return { user, isAuthorized };
  }
</script>


<script>
  import FirebaseProvider from "@providers/FirebaseProvider.svelte";
  import GoogleButton from "./_GoogleButton.svelte";
  import GoogleSignIn from "./_GoogleSignIn.svelte";

  export let user = null;
  export let isAuthorized = false;

  let disableSignout = false;

  async function logout() {
    disableSignout = true;

    const response = await fetch(`/auth/session`, {
      method: 'DELETE',
      mode: 'same-origin',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    disableSignout = false;

    return response.json()
      .then(({ isSignedOut }) => {
        if (isSignedOut) {
          user = null;
          isAuthorized = false;
        }

        window.location.reload();
      })
  }

</script>

<style>

  .login-container {
    text-align: center;
    padding: 1em 1em;
    margin: auto auto;
  }
</style>

<div class="login-container">

  {#if isAuthorized}
    <p>You're logged in as {user.name}.</p>
    <GoogleButton disabled={disableSignout} on:click={logout}>Sign out</GoogleButton>
  {:else}
    <h1>Login</h1>
    <FirebaseProvider>
      <GoogleSignIn />
    </FirebaseProvider>
  {/if}

</div>
