<script lang="ts">
  import { slide } from "svelte/transition";
  import { writable } from "svelte-local-storage-store";

  let collapsed = writable("bslp-focus-area-progress-collapsed", false);

  const powers = document.querySelectorAll(
    ".courserow .power.row .focusarea-list-item a"
  ).length;
  const completedPowers = document.querySelectorAll(
    ".courserow .power.row .focusarea-list-item a.success"
  ).length;
  const additionals = document.querySelectorAll(
    ".courserow .additional.row .focusarea-list-item a"
  ).length;
  const completedAdditionals = document.querySelectorAll(
    ".courserow .additional.row .focusarea-list-item a.success"
  ).length;

  const dataList = [
    {
      name: "All Focus Areas",
      amount: [completedPowers + completedAdditionals, powers + additionals],
    },
    { name: "Power", amount: [completedPowers, powers] },
    { name: "Additional", amount: [completedPowers, additionals] },
  ];
</script>

<div
  class="bslp-route-specific no-padding mentor-checkin-prework-reminder claro-content-wrapper-panel drop-shadow filter-none panel panel-default"
>
  <div class="panel-body">
    <div style="display: flex; justify-content: space-between;">
      <div class="mentor-checkin-prework-reminder-title">
        Focus Area Progress
      </div>
      <button
        on:click={() => {
          collapsed.set(!$collapsed);
        }}
      >
        <i
          class="material-icons material-icons-default"
          style="transform: rotate({$collapsed
            ? 0.5
            : 0}turn) scale(1.5); transition: transform 300ms;"
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

          <div class="bslp-progress-bar">
            <div
              class="bslp-progress"
              style="width: {percentage}%"
              class:bslp-progress-completed={percentage === 100}
            />
            <div class="bslp-progress-label">{name} ({complete}/{total})</div>
            <div class="bslp-progress-percentage">{percentage}%</div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .bslp-progress-bar {
    width: 100%;
    background: #f0f0fc;
    padding: 0.3em 0.5em;
    border-radius: 0.4em;
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    margin-top: 0.6em;
    position: relative;
    overflow: hidden;
  }

  .bslp-progress {
    position: absolute;
    background: #6b65e2;
    height: 100%;
    top: 0;
    left: 0;
  }

  .bslp-progress.bslp-progress-completed {
    background: #008656;
  }

  :has(> .bslp-progress.bslp-progress-completed) .bslp-progress-percentage {
    color: white;
  }

  .bslp-progress-label {
    position: relative;
    color: white;
  }

  .bslp-progress-percentage {
    position: relative;
    color: black;
  }
</style>
