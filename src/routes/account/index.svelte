<script>
  import { getContext } from "svelte";
  import UserCard from "@components/UserCard.svelte";

  let user = getContext("user");
</script>

<h1>Your Account</h1>
<p>You're logged in as {user.name}.</p>

<a href="/auth/login">Sign out</a>


