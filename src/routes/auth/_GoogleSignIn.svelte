
<script>
  import { getContext } from "svelte";

  const onFirebaseLoaded = getContext("load:firebase");
  let user = null;
  let firebase = null;
  let auth = null;

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

    auth.signInWithPopup(googleProvider)
      .then(async function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result)

        user = result.user;

        const idToken = await getCurrentUser();


        verifyToken(idToken)
          .then(function(response) {
            console.log(response);
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
    // Example POST method implementation:

    // Default options are marked with *
    const response = await fetch(`/auth/session?id_token=${idToken}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'same-origin', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
    });

    console.log(response);

    return response.json();
  }
</script>

<style>

  .google-signin {
    padding: 0.5em 1.5em;
    background-color: #fafafa;
    border: 1px solid #bbb;
    border-radius: 3px;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.5em auto;
    cursor: pointer;
  }

  .google-signin:hover,
  .google-signin:active {
    background-color: #f6f6f6;
  }

  .google-signin-icon {
    display: inline-block;
    margin-right: 1em;
  }
</style>

{#if user !== null}
  <h2>Welcome {user.displayName}</h2>
  <p>Authorizing...</p>

{:else}
  <form class="signin-form" on:submit|preventDefault={signInWithGoogle} disabled={isDisabled}>
    <button type="submit" class="google-signin">
      <img class="google-signin-icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google's G icon" width="18" />
      Sign in with Google
    </button>
  </form>
{/if}



