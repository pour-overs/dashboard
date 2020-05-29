<script context="module">
  const fetchOptions = {
    credentials: "include"
  };
  export async function preload(page, session) {

    // todo: perform fetches in parallel
    const { users, pageToken } = await this.fetch(
      "/users/list?page=",
      fetchOptions
    ).then(response => response.json());

    const whitelist = await this.fetch("/users/whitelist", fetchOptions).then(response => response.json())
    return { users, pageToken, whitelist };
  }
</script>

<script>
  export let users = [];
  export let whitelist = [];
  export let pageToken = null;

  let whitelistList = null;
  let newWhitelistEmail = null;
  let disableLoadMore = pageToken === null;
  $: showLoadMore = pageToken !== null;
  $: count = users.length;

  let deletingRow = null;
  let addingRow = false;

  import UserCard from "../../components/UserCard.svelte";

  async function loadMore() {
    disableLoadMore = true;
    const usersResult = await fetch(
      `/users/list?page=${pageToken}`,
      fetchOptions
    ).then(response => response.json());

    pageToken = usersResult.pageToken || null;
    disableLoadMore = pageToken === null;
    users = [...users, ...usersResult.users];
  }

  async function updateWhitelist(list) {
    whitelist = await fetch("/users/whitelist", {
      ...fetchOptions,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(list)
    })
      .then(response => response.json())
      .catch(err => Promise.resolve(whitelist));
  }

  async function addWhitelistUser() {
    const value = newWhitelistEmail.value.toLowerCase().trim();

    if (value.length > 3 && !whitelist.includes(value)) {
      addingRow = true;
      newWhitelistEmail.disabled = true;
      await updateWhitelist([...whitelist, value]);
      newWhitelistEmail.value = "";
      newWhitelistEmail.disabled = false;
      addingRow = false;
    }
  }

  async function removeWhiteListUser(email) {
    deletingRow = email;
    await updateWhitelist(whitelist.filter(a => a !== email));
    deletingRow = null;
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

  .whitelist .row {
    padding: 0.25em 0.5em;
  }

  .whitelist.disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.7;
  }

  .row.deleting {
    background-color: #c44;
    color: #fff;
    border-radius: 3px;
  }

  .row.add-user-row {
    border: 1px solid #d2d2d2;
    border-radius: 3px;
    padding: 1em 1em;
    margin: 0.5em auto;
  }

  hr {
    margin: 2em auto;
    height: 1px;
    max-width: 6em;
    border: none;
    border-bottom: 1px double #eee;
  }
</style>

<h1>Users</h1>

<p>The list of users who have authenticated with the dashboard.</p>

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

<hr />

<h2>Whitelist</h2>

<p>This list determines which users can log into the dashboard.</p>

<ul
  class="whitelist"
  bind:this={whitelistList}
  class:disabled={deletingRow !== null || addingRow}>
  <li class="row add-user-row">
    <label>
      Add to Whitelist
      <input type="email" bind:this={newWhitelistEmail} />
    </label>

    <button type="button" on:click={addWhitelistUser}>Add</button>

  </li>
  {#each whitelist as email}
    <li class="row" class:deleting={deletingRow === email}>
      <span>{email}</span>
      <button on:click={() => removeWhiteListUser(email)}>Remove</button>
    </li>
  {:else}
    <li class="empty">No whitelisted users.</li>
  {/each}
</ul>
