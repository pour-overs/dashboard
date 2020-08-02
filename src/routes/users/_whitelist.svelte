<script>

  export let whitelist = [];

  let whitelistList = null;
  let newWhitelistEmail = null;

  let deletingRow = null;
  let addingRow = false;


  async function updateWhitelist(list) {
    whitelist = await fetch("/api/whitelist", {
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

  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 0.5em 0;
  }

  .row:hover {
    background-color: rgba(0,0,0,0.1);
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
    background-color: var(--color1);
    color: var(--button-color);
    border-radius: 3px;
  }

  .row.add-user-row {
    border: 1px solid var(--border-color);
    border-radius: 3px;
    padding: 1em 1em;
    margin: 0.5em auto;
  }

</style>

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