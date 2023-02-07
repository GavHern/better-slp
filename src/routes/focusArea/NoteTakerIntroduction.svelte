<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { scale, fade } from "svelte/transition";

  const dispatch = createEventDispatcher();

  const getStarted = () => {
    dispatch("exit");
  };
</script>

<div class="bslp-note-taker-intro-container" transition:fade={{ duration: 250 }}>
  <div class="bslp-note-taker-intro-modal" transition:scale={{ start: 0.7, duration: 250 }}>
    <h2>BetterSLP Note Taker</h2>
    <p>
      The BetterSLP note taker allows you to seamlessly take notes on a focus area. Here are some important things to
      know before you get started:
    </p>
    <ul>
      <li>Notes are automatically saved when you close the note editor</li>
      <li>Notes get saved to the current device you are using, meaning they will not be synced across devices</li>
      <li>If you wish to discard any changes to the note you are working on, simply refresh the page</li>
    </ul>

    <button on:click={getStarted}>
      Get started!
      <i class="material-icons material-icons-default">arrow_forward</i>
    </button>
  </div>
</div>

<style lang="stylus">
	.bslp-note-taker-intro-container
		width: 100%
		height: 100%
		position: absolute
		inset: 0
		z-index: 50000
		background-color: rgba(22, 27, 31, 0.5)

		.bslp-note-taker-intro-modal
			position: absolute
			inset: 0
			margin: auto
			width: 24rem
			height: 32rem
			padding: 1rem
			box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
			background: linear-gradient(135deg, rgba(87,81,210,1) 0%, rgba(0,212,255,1) 100%);
			border-radius 0.5rem

			h2, p, ul, button
				color: #ffffff !important
				margin-bottom: 1rem
				font-size: 1.1em

			h2
				font-size: 2.2em
				font-weight: 500

			ul
				list-style: disc
				padding-inline-start: 24px

			button
				margin-top: 1rem
				border: 2px solid white
				text-transform: uppercase
				font-weight: 500
				padding: 0.75rem 1rem
				border-radius: 0.5rem
				transition all 300ms

				i
					padding-left: 4px

				&:hover
					background-color: #ffffff
					color: rgba(87,81,210,1) !important
</style>
