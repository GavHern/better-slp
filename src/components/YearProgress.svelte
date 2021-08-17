<script lang="ts">
	import PieChart from './subcomponents/PieChart.svelte';

	import { getCurrentAcademicYear } from '../ts/modules/methods';

	let yearAPIResults: any = fetch(`https://www.summitlearning.org/my/year/${getCurrentAcademicYear()}.json`);

	const progressInfo: any[] = [
		{ percentage: 100 },
		{ percentage: 66 },
		{ percentage: 95 },
		{ percentage: 23 }
	];
</script>

<ul class="claro-list-group mentor-card list-group">
	<li class="list-group-item">
		<div class="row">
			<div class="col-md-10">
				<h2 class="app-heading mentor-card-title">
					Year Progress
				</h2>
			</div>
		</div>
	</li>
	<li class="list-group-item better-slp-year-progress-row">
		<div class="better-slp-year-progress-chart-containter">

			{#await yearAPIResults}
				Loading...
			{:then value} 
				{#each progressInfo as info}
					<div class="better-slp-year-progress-chart">

						<div class="better-slp-pie-chart-container">
							<PieChart percentage={info.percentage} />
						</div>

					</div>
				{/each}
			{/await}

		</div>
	</li>
</ul>

<style lang="scss">
	* {
		box-sizing: border-box;
	}

	.better-slp-year-progress-row {
		overflow: auto;
	}

	.better-slp-year-progress-chart-containter {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.better-slp-pie-chart-container {
		margin: 0.8rem;
	}
</style>