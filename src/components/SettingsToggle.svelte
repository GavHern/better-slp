<script lang="ts">
  import { Writable } from "svelte/store";

  export let settingsPopoverOpen: Writable<boolean>;

  const togglePopover = () => {
    $settingsPopoverOpen = !$settingsPopoverOpen;
  };
</script>

<button class="bslp-settings-toggle-button bslp-global-component" on:click={togglePopover}>
  <i class="material-icons">settings</i>
</button>

<style lang="stylus">
  .bslp-settings-toggle-button
    width: 100%
    height: 100%
    color: #ffffff
    font-size: 1.1rem
</style>
