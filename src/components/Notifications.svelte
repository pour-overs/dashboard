<script>
  import {
    notifications,
    loading,
    isLoading,
    clearNotification
  } from "../stores/notifications.js";

  import Icon from "./Icon.svelte";

  $: hasNotification = $notifications !== null;
  $: notification = $notifications;
</script>

<style>

  .notifications {
    position: sticky;
    top: 0.5em;
    margin-bottom: 1em;
  }

@media (min-width: 50em) {
  .notifications {
    z-index: 9999;
    position: fixed;
    top: 0.5em;
    right: 1em;
    margin: 0 0;
  }
}


  .notification {
    padding: 1em 1em;
    font-size: 0.75em;
    font-weight: 600;
    background-color: #333;
    color: #ddd;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .notification:hover {
    background-color: #111;
    color: #eee;
  }

  .notification:hover .close-icon {
    opacity: 1;
  }

  .close-icon {
    display: inline-block;
    transform: translateX(0.5em);
    opacity: 0.5;
  }

</style>

<div class="notifications">
  {#if $loading}
    <div class="notification">
      <div class="spinner">
        <Icon name="refresh" />
      </div>
    </div>
  {:else if hasNotification}
    <div class="notification" on:click={clearNotification}>
      {notification}
      <span class="close-icon">
        <Icon name="close" />
      </span>
    </div>
  {/if}
</div>
