<script>
  import { onMount, getContext } from "svelte";
  import { THEMES, theme as userTheme } from "@stores/theme.js";

  let CodeMirror = null;
  const getCodeMirror = getContext("getCodeMirror");
  
  const CODEMIRROR_THEME = {
    LIGHT: "neo",
    DARK: "base16-dark",
  }


  $: theme = $userTheme === THEMES.DEFAULT ? CODEMIRROR_THEME.LIGHT : CODEMIRROR_THEME.DARK;

  let editor = null;
  let api = null;

  onMount(async () => {
    
    CodeMirror = getCodeMirror();
    initializeEditor();

    return () => {
      CodeMirror = null;
      editor = null;
      api = null;
    }
  });

  function initializeEditor() {

    api = CodeMirror.fromTextArea(editor, {
      lineNumbers: true,
      mode: { name: "gfm", gitHubSpice: true, },
      theme: theme,
      spellcheck: true,
      lineWrapping: true,
    });

    api.setSize("100%", "40vmax");
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
    <textarea bind:this={editor} id="editor"># Hello!

This is the initial value of a page. You should definitely update this.
This editor supports **markdown**! Any markdown you enter will be converted into HTML.
</textarea>
</div>
