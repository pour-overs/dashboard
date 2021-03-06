<script context="module">
  const fetchOptions = {
    credentials: "include"
  };

  export async function preload(page, session) {

  }

  export async function loadUsers(page, session) {
    const { users, pageToken } = await fetch(
      "/api/users?page=",
      fetchOptions
    ).then(response => response.json());

    return { users, pageToken };
  }

  export async function loadWhitelist(page, session) {
    const whitelist = await fetch("/api/whitelist", fetchOptions).then(
      response => response.json()
    );
    return whitelist;
  }
</script>

<script>
  import { onMount } from "svelte";
  import { Deferred } from "@utils";
  import PageTitle from "@components/PageTitle.svelte";
  import UserCard from "@components/UserCard.svelte";
  import UserList from "./_userlist.svelte";
  import Whitelist from "./_whitelist.svelte";
  import Loading from "@components/Loading.svelte";

  let loadingUsers = new Deferred();
  let loadingWhitelist = new Deferred();


  onMount(async() => {
    loadingUsers.settleWith(loadUsers());
    loadingWhitelist.settleWith(loadWhitelist());
  })

  function reloadUsers() {
    loadingUsers = new Deferred();
    loadingUsers.settleWith(loadUsers());
  }

  function reloadWhitelist() {
    loadingWhitelist = new Deferred();
    loadingWhitelist.settleWith(loadWhitelist());
  }
</script>

<style>
  hr {
    margin: 2em auto;
    height: 1px;
    max-width: 6em;
    border: none;
    border-bottom: 1px double var(--border-color);
  }

  .deferred-content {
    min-height: 40vh;
    overflow-y: auto;
  }
</style>

<PageTitle title="Users">Users</PageTitle>

<p>The list of users who have authenticated with the dashboard.</p>

<div class="deferred-content">

  {#await loadingUsers}
    <Loading text="Loading Users" />
  {:then data}
    <UserList {...data} />
  {:catch error}
    <p>
      Unable to load users at this time. <button on:click={reloadUsers}>Retry</button>
    </p>
  {/await}
</div>

<hr />

<h2>Whitelist</h2>

<p>This list determines which users can log into the dashboard.</p>

<div class="deferred-content">

  {#await loadingWhitelist}
    <Loading text="Loading" />
  {:then whitelist}
    <Whitelist {whitelist} />
  {:catch error}
    <p>
      Unable to whitelist at this time. <button on:click={reloadWhitelist}>Retry</button>
    </p>
  {/await}

</div>
