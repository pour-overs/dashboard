<script>
  import { getContext } from "svelte";

  const currentUser = getContext("user");

  export let name;
  export let uid;
  export let picture;
  //export let email;
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
    background-color: transparent;
    border-radius: 3px;
    margin: 0em 0em;
    cursor: pointer;
    color: var(--body-color);
    text-decoration: none;
  }

  .user-picture {
    width: 1.5em;
    margin-right: 1em;
    border-radius: 3px;
  }

  .user-card:hover {
    color: var(--body-color);
    background-color: var(--selectable-bg--hover);
  }

</style>


<a class="user-card" {href} data-id={uid}>
  <img class="user-picture" src={picture} {alt} title={alt} />
  <span class="user-name">{text || name}</span>
</a>
