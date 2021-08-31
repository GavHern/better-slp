<script lang="ts">
	function visitRandomFocusArea() {
		const focusAreaLinks = document.querySelectorAll('.focusarea-list-item.courserow-list-item a:not(.success)')

		if(focusAreaLinks.length === 0) return alert("You have passed every focus area. Congrats!");

		// Oneliner for getting a random item from the focusAreaLinks list
		const randomFocusAreaLink: any = focusAreaLinks[Math.floor(Math.random() * focusAreaLinks.length)];

		randomFocusAreaLink.click();
	}
</script>

<div class="better-slp-random-focus-area btn-group">
	<button type="button" class="page-title-button btn-link" on:click={visitRandomFocusArea}>
		<i class="material-icons material-icons-default better-slp-random-focus-area-icon">casino</i>
	</button>
</div>

<style lang="scss">
	.better-slp-random-focus-area {
		margin-right: 15px;
		display: inline-block;
		position: relative;

		.better-slp-random-focus-area-icon {
			font-size: 150%;
		}

		/* Tooltip */
		&::after {
			content: 'Random Focus Area';
			opacity: 0;
			pointer-events: none;
			width: 120px;
			background-color: #ffffff;
			color: black;
			text-align: center;
			padding: 5px 0;
			border-radius: 0.5rem;

			top: 100%;
			left: 50%;
			margin-left: -60px;

			transform: translateY(0.5rem);
		
			position: absolute;
			z-index: 1;
			transition: opacity 300ms;

			box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
		}

		&::before {
			content: " ";
			opacity: 0;
			pointer-events: none;
			position: absolute;
			bottom: 0%;  /* At the top of the tooltip */
			left: 50%;
			margin-left: -5px;
			border-width: 5px;
			border-style: solid;
			border-color: transparent transparent #ffffff transparent;
			transform: translateY(0.5rem);
			transition: opacity 300ms;
		}

		&:hover::after, &:hover::before {
			opacity: 1;
		}
	}
</style>