<script>
  export let date = undefined;
  // export let relative = false;
  export let displayTime = true;
  export let displayDate = true;

  $: _date = new Date(date);
  $: isValid = _date.toString() !== "Invalid Date";

</script>

<span class="datetime">
  {#if isValid}
    {#if displayDate}{_date.toLocaleDateString()}{/if}
    {#if displayTime && displayDate} at {/if}
    {#if displayTime}{_date.toLocaleTimeString()}{/if}
  {:else}
    Invalid Date
  {/if}
</span>



