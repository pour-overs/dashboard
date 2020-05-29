<script>
  // https://material.io/resources/icons/?icon=library_books&style=baseline
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
  <path
    d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2
    2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4
    4H9v-2h6v2zm4-8H9V5h10v2z" />

</svg>
