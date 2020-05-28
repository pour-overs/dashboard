<script context="module">

  const fetchOptions = {
    credentials: "include"
  };
  export async function preload(page, session) {
    const { users, pageToken } = await this.fetch("/users/list?page=", fetchOptions)
      .then(response => response.json());

    return { users, pageToken };
  }
</script>

<script>
  export let users = [];
  export let pageToken = null;
  let disableLoadMore = pageToken === null;
  $: showLoadMore = pageToken !== null;
  $: count = users.length;

  import UserCard from "../../components/UserCard.svelte";

  async function loadMore() {
    disableLoadMore = true;
    const usersResult = await fetch(`/users/list?page=${pageToken}`, fetchOptions)
      .then(response => response.json());

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
    color: #999;
  }

  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .row:hover {
    background-color: #eee;
  }

</style>

<h1>Users</h1>

<p class="label">
  {count} user{count == 1 ? "" : "s"}
</p>
<ul>
  {#each users as user (user.uid)}
    <li class="row">
      <UserCard {...user} picture={user.photoURL} name={user.displayName} />
      <span class="user-email">{user.email}</span>
    </li>
  {:else}
    <li class="empty">There was a problem loading users. Please reload the page.</li>
  {/each}
</ul>

{#if showLoadMore}
  <button on:click={loadMore} disabled={disableLoadMore}>Load More</button>
{/if}
