
<script>
  import { onMount } from "svelte";

  let isMounted = false;
  let firebaseReady = false;
  let isfirebaseUIReady = false;

  onMount(() => {
    isMounted = true;
    window.verifyToken = verifyToken;
  });

  function firebaseLoaded() {
    firebaseReady = true;
  }

  function firebaseUILoaded() {
    isfirebaseUIReady = true;
  }

  async function verifyToken(id_token) {
    // Example POST method implementation:

    // Default options are marked with *
    const response = await fetch(`/auth/session?id_token=${id_token}`, {
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

  .login-container {
    text-align: center;
    padding: 1em 1em;
    margin: auto auto;
  }
</style>

<svelte:head>
  {#if isMounted}
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js" on:load={firebaseLoaded}></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-auth.js"></script>

    <!-- TODO: Add SDKs for Firebase products that you want to use
        https://firebase.google.com/docs/web/setup#available-libraries -->
  {/if}
  {#if firebaseReady}
    <script src="https://www.gstatic.com/firebasejs/ui/4.4.0/firebase-ui-auth.js" on:load={firebaseUILoaded}></script>
    <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.4.0/firebase-ui-auth.css" />
  {/if}
  {#if isfirebaseUIReady}
    <script>
      // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: "AIzaSyDQuFKvmU4pKNN99MtgfyiKlJr-mCc9VaI",
        authDomain: "pour-over-guides.firebaseapp.com",
        databaseURL: "https://pour-over-guides.firebaseio.com",
        projectId: "pour-over-guides",
        storageBucket: "pour-over-guides.appspot.com",
        messagingSenderId: "874558443055",
        appId: "1:874558443055:web:41256a15e7e9ab76a7c0da",
        measurementId: "G-3G8CQ1J701"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);


      // FirebaseUI config.
      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            console.log(authResult, redirectUrl);
            console.log("verifying user");

            verifyToken(authResult.credential.idToken)
              .then((response) => {
                console.log("verified user?", response)
                debugger;

                if (response.isValid) {
                  window.location.href = redirectUrl || window.location.origin;
                }

              });
            return false;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('firebaseui-loader').style.display = 'none';
          }
        },
        signInSuccessUrl: window.location.origin,
        signInFlow: 'popup',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());

      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
  </script>
  {/if}
</svelte:head>

<div class="login-container">
  <h1>Login</h1>

  <div id="firebaseui-loader">
    <p>Loading...</p>
  </div>
  <div id="firebaseui-auth-container"></div>
</div>
