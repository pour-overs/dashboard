<script>

  import UserCard from "@components/UserCard.svelte";

  export let users = [];
  export let pageToken = null;

  let disableLoadMore = pageToken === null;
  $: showLoadMore = pageToken !== null;
  $: count = users.length;



  async function loadMore() {
    disableLoadMore = true;
    const usersResult = await fetch(
      `/api/users?page=${pageToken}`,
      fetchOptions
    ).then(response => response.json());

    pageToken = usersResult.pageToken || null;
    disableLoadMore = pageToken === null;
    users = [...users, ...usersResult.users];
  }

</script>


<style>
  ul {
    list-style: none;
    padding: 0 0;
    margin: 0 0;
  }

  .label {
    opacity: 0.5;
  }

  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 0.5em 0;
    flex-flow: row wrap;
  }

  .row:hover {
    background-color: rgba(0,0,0,0.1);
  }

</style>

<p class="label">{count} user{count == 1 ? '' : 's'}</p>
<ul>
  {#each users as user (user.uid)}
    <li class="row">
      <UserCard {...user} picture={user.photoURL} name={user.displayName} />
      <span class="user-email">{user.email}</span>
    </li>
  {:else}
    <li class="empty">
      There was a problem loading users. Please reload the page.
    </li>
  {/each}
</ul>

{#if showLoadMore}
  <button on:click={loadMore} disabled={disableLoadMore}>Load More</button>
{/if}