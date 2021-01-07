<script context="module">

  const CODEMIRROR_THEME = {
    LIGHT: "neo",
    DARK: "base16-dark",
  }


</script>

<script>
  import { onMount, getContext, createEventDispatcher, tick } from "svelte";
  import { THEMES, theme as userTheme } from "@stores/theme.js";

  let CodeMirror = null;
  const getCodeMirror = getContext("getCodeMirror");
  const dispatch = createEventDispatcher();

  export const reset = async () => {
    if (instance) {
      instance.setValue(defaultValue);
      instance.getDoc().clearHistory();
      await tick();
      instance.refresh();
    }
  };

  export let defaultValue = "";
  export let value = defaultValue;

  let editor = null;
  let instance = null;

  $: theme = $userTheme === THEMES.DEFAULT ? CODEMIRROR_THEME.LIGHT : CODEMIRROR_THEME.DARK;

  onMount(async () => {

    CodeMirror = getCodeMirror();
    initializeEditor();

    instance.on("update", () => {
      value = instance.getValue();
      dispatch("change", value);
    });

    return () => {
      CodeMirror = null;
      editor = null;
      instance.off("update");
      instance = null;
    }
  });

  function initializeEditor() {

    instance = CodeMirror.fromTextArea(editor, {
      lineNumbers: true,
      mode: { name: "gfm", gitHubSpice: true, },
      theme: theme,
      spellcheck: true,
      lineWrapping: true,
      scrollbarStyle: "simple",
    });

    instance.setValue(value);

    instance.setSize("100%", "30vmax");
  }

</script>

<style>

  .container {
    border: 1px solid var(--input-border);
    border-radius: 6px;
    margin-top: 0.5rem;
  }
</style>

<label for="editor">
  Page Content
</label>
  <div class="container">
    <textarea bind:this={editor} id="editor"></textarea>
</div>
