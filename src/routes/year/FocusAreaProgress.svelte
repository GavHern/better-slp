<script lang="ts">
  import { slide } from "svelte/transition";
  import { writable } from "svelte-local-storage-store";

  let collapsed = writable("bslp-focus-area-progress-collapsed", false);

  const powers = document.querySelectorAll(".courserow .power.row .focusarea-list-item a").length;
  const completedPowers = document.querySelectorAll(".courserow .power.row .focusarea-list-item a.success").length;
  const additionals = document.querySelectorAll(".courserow .additional.row .focusarea-list-item a").length;
  const completedAdditionals = document.querySelectorAll(
    ".courserow .additional.row .focusarea-list-item a.success"
  ).length;

  const dataList = [
    {
      name: "All Focus Areas",
      amount: [completedPowers + completedAdditionals, powers + additionals],
    },
    { name: "Power", amount: [completedPowers, powers] },
    { name: "Additional", amount: [completedAdditionals, additionals] },
  ];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="bslp-route-specific no-padding mentor-checkin-prework-reminder claro-content-wrapper-panel drop-shadow filter-none panel panel-default"
>
  <div class="panel-body">
    <div
      style="display: flex; justify-content: space-between;"
      on:click={() => {
        collapsed.set(!$collapsed);
      }}
    >
      <div class="mentor-checkin-prework-reminder-title">Focus Area Progress</div>
      <button>
        <i
          class="material-icons material-icons-default"
          style="transform: rotate({$collapsed ? -0.5 : 0}turn) scale(1.5); transition: transform 300ms;"
        >
          arrow_drop_up
        </i>
      </button>
    </div>

    {#if !$collapsed}
      <div transition:slide>
        {#each dataList as data}
          {@const name = data.name}
          {@const complete = data.amount[0]}
          {@const total = data.amount[1]}
          {@const percentage = Math.round((complete / total) * 100)}

          <div class="bslp-progress-bar" class:bslp-progress-completed={percentage === 100}>
            <div class="bslp-progress" style="width: {percentage}%">{name} ({complete}/{total})</div>
            <div class="bslp-progress-label" aria-hidden="true">{name} ({complete}/{total})</div>
            <div class="bslp-progress-percentage">{percentage}%</div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="stylus">
  .bslp-progress-bar
    width: 100%
    background: #f0f0fc
    padding: 0.3em 0.5em
    border-radius: 0.4em
    display: flex
    justify-content: space-between
    font-weight: 500
    margin-top: 0.6em
    position: relative
    overflow: hidden
	
	.bslp-progress
		position: absolute
		background: #6b65e2
		color: white
		overflow: clip
		z-index: 1
		padding: 0.3em 0.5em
		white-space: nowrap
		height: 100%
		top: 0
		left: 0

	.bslp-progress-completed
  	.bslp-progress
   	  background: #008656
		.bslp-progress-percentage
  	  color: white

  .bslp-progress-label
    position: relative
    color: black

  .bslp-progress-percentage
    position: relative
    color: black
</style>
