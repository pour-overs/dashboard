<script>
  // https://material.io/resources/icons/?icon=recent_actors&style=baseline
  import { getContext } from "svelte";
  let theme = getContext("iconStyle") || {};

  export let size = theme.size || 24;
  export let width = `${size}px`;
  export let height = `${size}px`;
  export let fill = theme.color || "black";
  export let viewbox = "0 0 24 24";
</script>

<svg xmlns="http://www.w3.org/2000/svg" {viewbox} {fill} {width} {height}>
  <slot />
</svg>
