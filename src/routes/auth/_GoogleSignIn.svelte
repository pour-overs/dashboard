
<script>
  import { getContext } from "svelte";
  import GoogleButton from "./_GoogleButton.svelte";

  const onFirebaseLoaded = getContext("load:firebase");
  let user = null;
  let firebase = null;
  let auth = null;

  let status = "Authorizing...";

  $: isDisabled = firebase === null;

  onFirebaseLoaded.then((module) => {
    firebase = module.firebase;
    auth = module.auth;
  })

  function getCurrentUser() {
    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .catch(function(error) {
        // Handle error
      });
  }

  function signInWithGoogle() {

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    status = "Authenticating...";
    auth.signInWithPopup(googleProvider)
      .then(async function(result) {

        status = "Authorizing...";
        user = result.user;

        const idToken = await getCurrentUser();

        verifyToken(idToken)
          .then(function(response) {

            status = "Authorized. You've been signed in! Redirecting...";

            window.setTimeout(() => {
              window.location = window.location.origin;
            }, 1200);

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
        // ...
      });
  }

  /**
   * Verify's a user's sign-in and POSTs to create a session
   * @param {string} idToken the id token related to an authenticated user's account
   */
  async function verifyToken(idToken) {

    const response = await fetch(`/auth/session?id_token=${idToken}`, {
      method: 'POST',
      mode: 'same-origin',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    console.log(response);

    return response.json();
  }
</script>

{#if user !== null}
  <h2>Welcome {user.displayName}</h2>
  <p>{status}</p>

{:else}
  <form class="signin-form" on:submit|preventDefault={signInWithGoogle} disabled={isDisabled}>
    <GoogleButton type="submit">Sign in with Google</GoogleButton>
  </form>
{/if}



