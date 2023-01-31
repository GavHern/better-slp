<script lang="ts">
  import { onMount } from "svelte";
  import Quill from "quill";
  import "quill/dist/quill.snow.css";

  let editor;
  let quill;

  export let id: string;

  onMount(() => {
    window.onbeforeunload = () => "You have unsaved changes!";

    quill = new Quill(editor, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          ["link", "image", "video", "blockquote"],
          [{ list: "bullet" }, { list: "ordered" }],
          [{ align: [] }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ script: "sub" }, { script: "super" }],
          ["clean"],
        ],
      },
      theme: "snow",
      placeholder: "Write your notes here...",
    });

    chrome.storage.local.get([`note:${id}`]).then((result) => {
      if (Object.keys(result).length !== 0) {
        const delta = result[`note:${id}`];
        quill.setContents(JSON.parse(delta));
      }
    });
  });

  const close = (save = true) => {
    if (save) {
      const delta = JSON.stringify(quill.getContents());

      chrome.storage.local.set({ [`note:${id}`]: delta }).then(() => {
        console.log("Wrote document value to chrome.storage.local");
      });
    }

    document.querySelectorAll(".bslp-notes").forEach((e) => {
      e.remove();
    });

    window.onbeforeunload = null;
  };
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === "Escape") close();
  }}
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="bslp-route-specific bslp-notes bslp-note-taker-scrim" on:click={() => close()} />

<div class="bslp-route-specific bslp-notes bslp-note-taker-container" data-id={id}>
  <div class="bslp-note-taker">
    <div class="bslp-quill-editor" bind:this={editor} />
  </div>
</div>

<style>
  .bslp-note-taker-scrim {
    all: unset;
    position: fixed;
    z-index: 49999;
    background: rgba(22, 27, 31, 0.5);
    inset: 0;
  }

  .bslp-note-taker-container {
    all: unset;
    position: fixed;
    display: flex;
    align-items: center;
    inset: 0;
    margin: auto;
    z-index: 50000;
    pointer-events: none;
  }

  .bslp-note-taker {
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    width: min(80%, 1200px);
    height: 75%;
    background: #ffffff;
    margin: auto;
    border-radius: 3px;
    /* box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px; */
    box-shadow: 0 5px 15px rgb(0 0 0 / 50%);
  }

  .bslp-quill-editor {
    height: calc(100% - 42px);
    border-color: transparent;
    font-size: 1rem;
  }

  :global(.ql-toolbar.ql-snow) {
    border-top-color: transparent;
    border-inline-color: transparent;
  }

  :global(:is(.ql-color) > span > svg) {
    transform: translateY(-2px);
  }

  :global(:is(.ql-align, .ql-background) > span > svg) {
    transform: translateY(-3px);
  }
</style>
