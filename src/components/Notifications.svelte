<script>
  import { notifications, loading, isLoading, clearNotification } from "../stores/notifications.js";

  $: hasNotification = $notifications !== null;
  $: notification = $notifications;

</script>

<style>
  .notifications {
    position: fixed;
    top: 0.5em;
    right: 0.5em;
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
    margin-left: 0.5em;
    opacity: 0.5;
  }

</style>

<div class="notifications">
  {#if hasNotification}
    <div class="notification" on:click={clearNotification}>
      {notification} <span class="close-icon">&times;</span>
    </div>
  {/if}
</div>