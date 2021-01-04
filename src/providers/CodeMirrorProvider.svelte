<script>
  import "codemirror/lib/codemirror.css";
  import "codemirror/theme/base16-dark.css";
  import "codemirror/theme/neo.css";

  import { onMount, setContext } from "svelte";
  import Loading from "@components/Loading.svelte";

  let isLoading = true;
  let CodeMirror = null;

  setContext("getCodeMirror", () => CodeMirror);

  onMount(async () => {
    
    const [module, mode] = await Promise.all([import("codemirror"), import("codemirror/mode/markdown/markdown.js"), import("codemirror/mode/gfm/gfm.js")]);

    CodeMirror = module.default;
    mode; // ?
    isLoading = false;

    return () => {
      CodeMirror = null;
      isLoading = true;
    }
  });

</script>

{#if isLoading}
  <Loading text="Loading Editor" />
{:else}
  <slot />  
{/if}