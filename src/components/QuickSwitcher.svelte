<script lang="ts">
	import { onMount } from 'svelte';

	export let getQuickSwitcherAPIData: Promise<SummitLearningYearAPI | null>;
	export let parseQuickSwitcherAPIResponse: Function;
	let searchResults: searchResult[] = [];
	let filteredResults: searchResult[] = [];

	getQuickSwitcherAPIData.then(data => {
		searchResults = <searchResult[]>parseQuickSwitcherAPIResponse(data);
		fieldEditCallback();
	})


	let input: HTMLInputElement | null;
	let resultsContainer: HTMLElement | null;

	onMount(() => {
		input = <HTMLInputElement>document.getElementById('better-slp-quick-switcher-input');
		resultsContainer = document.getElementById('better-slp-quick-switcher-content-results');
		
		input?.focus();
	})


	function fieldEditCallback(): void {
		if(input?.value === '') {
			filteredResults = [];
			return;
		}

		filteredResults = searchResults.filter((result:searchResult) => {
			return result.title.toLowerCase().includes(input?.value.toLowerCase() ?? '')
		});
	}

	function destroyInstances(): void {
		const quickSwitcherInstances = document.querySelectorAll('.better-slp-quick-switcher-container');
		quickSwitcherInstances.forEach(e => e.remove());
	}

	function arrowKeyHandler(e: KeyboardEvent): void {
		e.preventDefault();

		const incrementAmount: -1 | 1 = e.key === "ArrowUp" ? -1 : 1;

		const firstResult = <HTMLElement>resultsContainer?.querySelector('a:first-child'); // Use querySelector because .focus() is not defined on .firstChild or .lastChild
		const lastResult = <HTMLElement>resultsContainer?.querySelector('a:last-child');
		const cappingPoint = incrementAmount === 1 ? lastResult : firstResult;
		const rolloverPoint = incrementAmount === 1 ? firstResult : lastResult;

		if([input, cappingPoint].includes(<HTMLElement>document.activeElement)){
			rolloverPoint?.focus();
		} else {
			if(document.activeElement === null) return;
			if(resultsContainer === null) return;

			const results = [...resultsContainer.childNodes];
			const nextItem = results.indexOf(document.activeElement) + incrementAmount;
			const nextResult = <HTMLElement>resultsContainer?.children[nextItem];

			nextResult.focus();
		};
	}

	function keyDownHandler(e: KeyboardEvent): void {
		switch(e.key) {
      case "ArrowUp": case "ArrowDown":
				arrowKeyHandler(e);
				break;
      case "Enter":case "Tab": break;
			case "Escape":
				destroyInstances();
				return;
      default:
        input?.focus();
    }
	}

	function inputSubmit(e: KeyboardEvent): void {
		if(e.key === "Enter") (resultsContainer?.firstChild as HTMLAnchorElement)?.click();
	}
</script>


<div id="better-slp-quick-switcher-container" class="better-slp-quick-switcher-container" on:keydown|capture={keyDownHandler}>
	<div id="better-slp-quick-switcher-content-wrapper">
		<input id="better-slp-quick-switcher-input" type="text" placeholder="Search..." autocomplete="off" on:input={fieldEditCallback} on:keydown={inputSubmit}>
		<div id="better-slp-quick-switcher-content-results">

			{#await getQuickSwitcherAPIData}
				<div class="better-slp-quick-switcher-loading-indicator" />

			{:then} 
			
				{#each filteredResults as item}
					<a href={item.link}>
						<div>
							{#if item.subtitle !== null}
							<h6>{item.subtitle}</h6>
							{/if}
							
							<div>{item.title}</div>						
						</div>
					</a>
				{/each}
			
			{:catch}

				<h3 style="color: #fff; text-align: center;">A network error occurred. Please try again later.</h3>

			{/await}

		</div>
	</div>
</div>

<style lang="scss">
	@mixin icon($icon-name) {
		content: $icon-name;
		font-family: Material Icons v54 !important;
		font-size: 120%;
		-webkit-font-smoothing: antialiased;
		font-style: normal;
		position: relative;
		text-rendering: optimizeLegibility;
	}

	.better-slp-quick-switcher-container { // Full Container
		z-index: 999999999; 
		position: fixed;
		-webkit-backdrop-filter: blur(2px);
		backdrop-filter: blur(2px);
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4) !important;

		& > div { // Main content wrapper
			display: flex;
			flex-direction: column;
			height: 100%;
			margin: auto;
			padding: 5rem 1rem;
			
			max-width: 36rem;
			@media screen and (min-width: 1280px) { // Large Breakpoint
				max-width: 56rem;
			}

			& > input { // Text input field
				width: 100%;
				height: 5rem;
				-webkit-backdrop-filter: blur(8px);
				backdrop-filter: blur(8px);
				background-color: rgba(255, 255, 255, 0.6) !important;
				border-radius: 9999px !important;
				padding-left: 1.5rem !important;
				padding-right: 1.5rem !important;
				box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
				flex-shrink: 0;
				margin-bottom: 1.5rem;
				font-size: 1.25rem !important;
				line-height: 1.75rem !important;
				border: none !important;
				&::placeholder { // Input placeholder
					opacity: 0.7;
					color: #000000;
				}
			}

			& > div { // Results items container
				width: 100%;
				max-height: 100%;
				-webkit-backdrop-filter: blur(8px);
				backdrop-filter: blur(8px);
				background-color: rgba(255, 255, 255, 0.5) !important;

				border-radius: 1.5rem !important;
				overflow: auto;

				.better-slp-quick-switcher-loading-indicator {
					display: block !important;
					width: 100%;
					height: 6rem;
					margin: 2rem auto;
					height: 3.4rem;
					width: 3.4rem;

					&::after {
						content: " ";
						display: block;
						width: 3.4rem;
						height: 3.4rem;
						margin: 8px;
						border-radius: 50%;
						border: 6px solid #fff;
						border-color: #fff transparent #fff transparent;
						animation: lds-dual-ring 1.2s linear infinite;
					}

					@keyframes lds-dual-ring {
						0% {
							transform: rotate(0deg);
						}
						100% {
							transform: rotate(360deg);
						}
					}
				}

				& > a { // Link item
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					height: 5rem;
					padding: 0 1.5rem;

					&:focus, &:hover { // Focus state
						background-color: rgb(59, 130, 246);
						outline: none !important;
						text-decoration: none !important;
					}

					& > div {
						h6 {
							color: rgb(255, 255, 255) !important;
							font-weight: 200 !important;
							opacity: 0.5;
							font-size: 1rem !important;
							line-height: 1.5rem !important;
							text-decoration: none !important;
						}

						div {
							color: rgb(255, 255, 255);
							font-weight: 600 !important;
							font-size: 1.25rem;
							line-height: 1.75rem;
							text-decoration: none !important;
						}
					};

					&::after {
						@include icon('arrow_forward');
						color: rgb(255, 255, 255) !important;
						font-size: 1.75rem;
						font-weight: 100;
					}
				}
			}
		}
	}
</style>