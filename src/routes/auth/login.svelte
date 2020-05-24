
<script>
  import { onMount } from "svelte";
  let isMounted = false;
  let firebaseReady = false;
  let isfirebaseUIReady = false;
  onMount(() => {
    isMounted = true;
  });

  function firebaseLoaded() {
    firebaseReady = true;
  }

  function firebaseUILoaded() {
    isfirebaseUIReady = true;
  }

</script>

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
        signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        // tosUrl: '<your-tos-url>',
        // // Privacy policy url/callback.
        // privacyPolicyUrl: function() {
        //   window.location.assign('<your-privacy-policy-url>');
        // }
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());

      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
  </script>
  {/if}
</svelte:head>

<h1>Login</h1>

<div id="firebaseui-auth-container"></div>