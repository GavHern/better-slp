<script lang="ts">
  import NoteTakerIntroduction from "./NoteTakerIntroduction.svelte";
  import { onMount } from "svelte";
  import Quill from "quill";

  let showIntroduction = JSON.parse(window.localStorage.getItem("bslp-note-taker-show-intro")) ?? true;

  let editor;
  let quill;

  export let id: string;
  export let title: string;

  onMount(() => {
    window.onbeforeunload = () => "You have unsaved changes!";

    const toolbarOptions = [
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
    ];

    // @ts-ignore
    quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
      placeholder: "Write your notes here...",
    });

    chrome.storage.local.get([`note:${id}`]).then((result) => {
      if (Object.keys(result).length !== 0) {
        const noteData = JSON.parse(result[`note:${id}`]);

        // Set the note title to the existing one in the note (unless it is missing)
        title = noteData?.title ?? title;

        quill.setContents(noteData.delta);
      }
    });
  });

  const close = (save = true) => {
    if (save) {
      const noteData = JSON.stringify({
        id,
        title,
        lastSaved: Date.now(),
        delta: quill.getContents(),
      });

      chrome.storage.local.set({ [`note:${id}`]: noteData }).then(() => {
        console.log("Wrote document value to chrome.storage.local");
      });
    }

    document.querySelectorAll(".bslp-notes").forEach((e) => {
      e.remove();
    });

    window.onbeforeunload = null;
  };

  const introductionExit = () => {
    showIntroduction = false;
    window.localStorage.setItem("bslp-note-taker-show-intro", "false");
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
    {#if showIntroduction}
      <NoteTakerIntroduction on:exit={introductionExit} />
    {/if}

    <div class="bslp-quill-editor" bind:this={editor} />
    <!-- <button class="bslp-note-taker-save-button">
      <i class="material-icons material-icons-default">save</i>
      Save without closing
    </button> -->
  </div>
</div>

<style lang="stylus">
  .bslp-note-taker-scrim
    all: unset
    position: fixed
    z-index: 49999
    background: rgba(22, 27, 31, 0.5)
    inset: 0

  .bslp-note-taker-container
    all: unset
    position: fixed
    display: flex
    align-items: center
    inset: 0
    margin: auto
    z-index: 50000
    pointer-events: none

	.bslp-note-taker
		display: flex
		flex-direction: column
		position: relative
		pointer-events: auto
		width: min(80%, 1200px)
		height: 75%
		background: #ffffff
		margin: auto
		border-radius: 3px
		/* box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px */
		box-shadow: 0 5px 15px rgb(0 0 0 / 50%)

  .bslp-quill-editor
    height: calc(100% - 42px)
    border-color: transparent
    font-size: 1rem
		color: black

  :global(.ql-toolbar.ql-snow)
    border-top-color: transparent
    border-inline-color: transparent

  :global(:is(.ql-color) > span > svg)
    transform: translateY(-2px)

  :global(:is(.ql-align, .ql-background) > span > svg)
    transform: translateY(-3px)
</style>
