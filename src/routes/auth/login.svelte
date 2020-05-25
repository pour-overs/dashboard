
<script>
  import GoogleSignIn from "./_GoogleSignIn.svelte";
  import FirebaseProvider from "../../providers/FirebaseProvider.svelte";
</script>

<style>

  .login-container {
    text-align: center;
    padding: 1em 1em;
    margin: auto auto;
  }
</style>

<div class="login-container">
  <h1>Login</h1>
  <FirebaseProvider>
    <GoogleSignIn />
  </FirebaseProvider>
</div>
