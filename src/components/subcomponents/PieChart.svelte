<script lang="ts">
	export let percentage: number;
</script>

<div class="better-slp-pie-container">
	<svg
		class="better-slp-pie-ring"
		height="120"
		width="120"
		viewBox="0 0 120 120"
		data-percentage={percentage}
	>
		<circle
			class="better-slp-pie-ring-circle-track"
			stroke="currentColor"
			stroke-width="14"
			fill="transparent"
			r="52"
			cx="60"
			cy="60"
		/>
		<circle
			class="better-slp-pie-ring-circle"
			stroke="currentColor"
			stroke-width="14"
			fill="transparent"
			r="52"
			cx="60"
			cy="60"
			style='--percentage: {percentage}'
		/>
	</svg>

	<h1 class="better-slp-pie-percentage">{percentage}%</h1>
</div>


<style lang="scss">
	.better-slp-pie-container {
		display: flex;
		position: relative;
	}
	
	.better-slp-pie-ring {
		.better-slp-pie-ring-circle {
			transform: rotate(-0.25turn); /* Axis Compensation */
			transform-origin: center;
			
			color: hsl(243, 100%, 65%);

			--pi: 3.1415926535;
			--radius: 52;
			--circomfrence: calc(2 * var(--pi) * var(--radius));

			stroke-dasharray: calc(var(--percentage, 100) * var(--circomfrence) / 100) var(--circomfrence)
		}

		.better-slp-pie-ring-circle-track {
			color: #eeeeee;
		}

		&[data-percentage="100"] {
			.better-slp-pie-ring-circle {
				color: #10B981;
			}

			.better-slp-pie-ring-circle-track {
				fill: #2eff9342;
			}
		}
	}

	.better-slp-pie-percentage {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		
		font-size: 1.8em;
		font-weight: 500;
	}
</style>