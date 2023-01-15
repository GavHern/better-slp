<script lang="ts">
  export let id: string;

  const close = () => {
    document.querySelectorAll(".bslp-note-taker-container").forEach((e) => {
      e.remove();
    });
  };
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === "Escape") close();
  }}
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="bslp-route-specific bslp-note-taker-container">
  <div class="bslp-note-taker">{id}</div>
</div>

<style>
  .bslp-note-taker-container {
    all: unset;
    position: fixed;
    display: flex;
    align-items: center;
    inset: 0;
    margin: auto;
    background: #0000008f;
    z-index: 50000;
  }

  .bslp-note-taker {
    width: 80%;
    height: 75%;
    background: #ffffff;
    margin: auto;
    border-radius: 0.75em;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
</style>
