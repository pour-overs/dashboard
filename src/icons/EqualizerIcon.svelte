<script>
  // https://material.io/resources/icons/?icon=equalizer
  import { getContext } from "svelte";
  let theme = getContext("iconStyle") || {};

  export let size = theme.size || 24;
  export let width = `${size}px`;
  export let height = `${size}px`;
  export let fill = theme.color || "black";
  export let viewbox = "0 0 24 24";

</script>


<svg xmlns="http://www.w3.org/2000/svg" {viewbox} {fill} {width} {height}>
  <path d="M0 0h24v24H0z" fill="none" />
  <path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z" />
</svg>
