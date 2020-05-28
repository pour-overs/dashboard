<script>
  import { getContext } from "svelte";

  const currentUser = getContext("user");

  export let name;
  export let uid;
  export let picture;
  export let email;
  export let text = null; // name override
  export let alt = text || name;
  export let href = `/users/${uid}`;


  const isCurrentUser = currentUser.uid === uid;

  if (isCurrentUser) {
    name = "You";
    href = "/account";
    alt = text || name;
  }

</script>

<style>

  .user-card {
    display: flex;
    align-items: center;
    padding: 0.5em 0.5em;
    background-color: rgba(255,255,255,0.2);
    border-radius: 3px;
    margin: 0em 0em;
    cursor: pointer;
  }

  .user-picture {
    width: 1.5em;
    margin-right: 0.5em;
    border-radius: 3px;
  }

  .user-card:hover {
    background-color: rgba(255,255,255,0.3);
  }

</style>


<a class="user-card" {href} data-id={uid}>
  <img class="user-picture" src={picture} {alt} title={alt} />
  <span class="user-name">{text || name}</span>
</a>
