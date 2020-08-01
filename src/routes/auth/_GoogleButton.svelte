<script>
  export let type = "button";
  export let text = "Sign in with Google";
  export const iconURL = "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg";
  export let disabled = false;
</script>

<style>

  .google-button {
    padding: 0.5em 1.5em;
    background-color: #fafafa;
    border: 1px solid #bbb;
    color: #444;
    border-radius: 3px;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.5em auto;
    cursor: pointer;
  }

  .google-button:hover,
  .google-button:active {
    background-color: #f6f6f6;
  }

  .google-button-icon {
    display: inline-block;
    margin-right: 1em;
  }

  .google-button:disabled {
    opacity: 0.5;
    background-color: #f0f0f0;
    color: #999;
    cursor: not-allowed;
  }
</style>

<button {type} class="google-button" on:click {disabled}>
  <img
    class="google-button-icon"
    src={iconURL}
    alt="Google's G icon"
    width="18" />
  <slot>
    {text}
  </slot>
</button>
