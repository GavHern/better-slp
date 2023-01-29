<script lang="ts">
  export let response;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatShortDate = (date) => {
    const d = date.split("-");
    return `${d[1]}/${d[2]}/${d[0]}`;
  };

  const formatLongDate = (date) => {
    const d = date.split("-");
    return `${months[+d[1] - 1]} ${+d[2]}, ${d[0]}`;
  };

  const getNextDayOff = (daysOff) => {
    const today = new Date();

    return daysOff.reduce((nextClosest, data) => {
      const dayOffDate = new Date(data.endOn);

      // Do nothing if end date already passed
      if (dayOffDate < today) return nextClosest;

      // Do nothing if the current next closest day off is sooner
      if (nextClosest.date != null && dayOffDate > nextClosest.date) return nextClosest;

      return {
        date: dayOffDate,
        ...data,
      };
    });
  };
</script>

<div class="bslp-route-specific claro-list-group sdl-course-grades list-group">
  <span class="grade-header list-group-item">
    <div class="row">
      <div class="col-xs-12 flex">
        <h2 class="courses-title">Next School Day Off</h2>
      </div>
    </div>
  </span>
  {#await response}
    <div class="loading-indicator-icon large" />
  {:then { nonInstructionalPeriods }}
    {@const nextDayOff = getNextDayOff(nonInstructionalPeriods)}
    <li class="grade-row list-group-item bslp-day-off">
      {#if new Date(nextDayOff.endOn) < new Date()}
        No more days off this year!
      {:else}
        {#if nextDayOff.startOn === nextDayOff.endOn}
          {formatLongDate(nextDayOff.startOn)}
        {:else}
          {formatShortDate(nextDayOff.startOn)} to {formatShortDate(nextDayOff.endOn)}
        {/if}
        <div class="bslp-day-off-reason">
          Reason: {nextDayOff.description}
        </div>
      {/if}
    </li>
  {:catch err}
    There was an error loading your year progress update.
  {/await}
</div>

<style>
  .loading-indicator-icon {
    margin-top: 1.5em;
  }

  .bslp-day-off {
    color: #5751d2 !important;
    font-size: 17px;
    font-weight: bold;
  }

  .bslp-day-off-reason {
    color: var(--eds-theme-color-text-neutral-subtle);
    font-size: 0.8rem;
  }
</style>