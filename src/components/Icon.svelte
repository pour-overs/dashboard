<script>

  import { getContext } from "svelte";

  const { size: _size, color: _color } = getContext("iconStyle");

  // https://material.io/resources/icons/
  export let name;
  export let size = _size;
  export let color = _color;

  $: styles = [];
  $: if (size) {
    styles = [...styles, `font-size: ${size}px;`];
  }

  $: if (color) {
    styles = [...styles, `color: ${color};`];
  }


</script>

<style>
  .icon {
    color: inherit;
    line-height: 1.5rem;
    vertical-align: middle;
    user-select: none;
  }
</style>

<span class="icon material-icons" style={styles.join(" ")}>{name}</span>