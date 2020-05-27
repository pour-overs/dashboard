<script>
  export let user = null;

  let src = user ? user.picture : "";
  let alt = user ? user.name : "";

  const href = "/account"
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

  .user-name {

  }

  .user-card:hover {
    background-color: rgba(255,255,255,0.3);
  }

</style>

{#if user !== null}
  <a class="user-card" {href} >
    <img class="user-picture" {src} {alt} title={alt} />
    <span class="user-name">{user.name}</span>
  </a>
{/if}