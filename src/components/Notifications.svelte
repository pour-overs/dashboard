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
    position: fixed;
    top: 0.5em;
    right: 1em;
  }

  .notification {
    padding: 0.5em 1em;
    background-color: #333;
    color: #ddd;
    border-radius: 3px;
    cursor: pointer;
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
  {#if hasNotification}
    <div class="notification" on:click={clearNotification}>
      {notification}
      <span class="close-icon">
        <Icon name="close" />
      </span>
    </div>
  {/if}
</div>
