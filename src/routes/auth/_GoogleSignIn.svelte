<script>
  import { getContext } from "svelte";
  import GoogleButton from "./_GoogleButton.svelte";
  import { notify } from "@stores/notifications.js";

  const onFirebaseLoaded = getContext("load:firebase");
  let user = null;
  let firebase = null;
  let auth = null;

  $: isDisabled = firebase === null;

  onFirebaseLoaded.then(module => {
    firebase = module.firebase;
    auth = module.auth;
  });

  function getCurrentUser() {
    return firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .catch(function(error) {
        notify(`Something went wrong: ${error}`, null);
      });
  }

  function signInWithGoogle() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    notify("Authenticating...", null);

    auth
      .signInWithPopup(googleProvider)
      .then(async function(result) {
        notify("Authorizing...", null);
        user = result.user;
        const idToken = await getCurrentUser();

        verifyToken(idToken).then(function(response) {

          if (response === null) {
            notify("Something went wrong. Please try again later.", null);
          }
          else if (response.isValid) {
            notify("Authorized. You've been signed in! Redirecting...", null);

            window.setTimeout(() => {
              window.location = window.location.origin;
            }, 1200);
          }
          else {
            notify("Your account is not authorized.", null);
          }
        });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error);
        // ...
        notify(`Failed to authenticate. Error Code: ${errorCode}`);
      });
  }

  /**
   * Verify's a user's sign-in and POSTs to create a session
   * @param {string} idToken the id token related to an authenticated user's account
   */
  async function verifyToken(idToken) {
    const response = await fetch(`/auth/session?id_token=${idToken}`, {
      method: "POST",
      mode: "same-origin",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer"
    });

    if (response.ok) {
      return response.json();
    }

    return Promise.resolve(null);
  }
</script>

{#if user !== null}
  <h2>Welcome {user.displayName}</h2>
{:else}
  <form
    class="signin-form"
    on:submit|preventDefault={signInWithGoogle}
    disabled={isDisabled}>
    <GoogleButton type="submit">Sign in with Google</GoogleButton>
  </form>
{/if}
