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
  $: showLoadMore = pageToken !== null;
  $: count = users.length;

  import UserCard from "../../components/UserCard.svelte";

  async function loadMore() {
    const usersResult = await fetch(`/users/list?page=${pageToken}`, fetchOptions)
      .then(response => response.json());

    pageToken = usersResult.pageToken;
    users = [...users, ...usersResult.users];

  }
</script>


<style>

  ul {
    list-style: none;
    padding: 0 0;
    margin: 0 0;
  }

  ul li:hover {
    background-color: #eee;
  }

</style>
<h1>Users</h1>

<p>
  Showing {count}
</p>
<ul>
  {#each users as user (user.uid)}
    <li>
      <UserCard {...user} picture={user.photoURL} name={user.displayName} />
    </li>
  {:else}
    <li class="empty">There are no users, maybe.</li>
  {/each}
</ul>

{#if showLoadMore}
  <button on:click={loadMore}>Load More</button>
{/if}
