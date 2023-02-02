<script lang="ts">
  import { formatShortDate, formatLongDate } from "./formatDates";

  export let response;

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

        <i class="material-icons material-icons-default bslp-day-off-info-tooltip"> help_outline </i>

        <div role="tooltip" class="fade in tooltip bottom blsp-day-off-tooltip">
          <div class="tooltip-arrow" style="left: 50%;" />
          <div class="tooltip-inner">
            This date is directly from Summit Learning's non-instructional periods database, though can sometimes be
            innaccurate.
          </div>
        </div>
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
    color: #5751d2;
    font-size: 17px;
    font-weight: bold;
  }

  .bslp-day-off-reason {
    color: var(--eds-theme-color-text-neutral-subtle);
    font-size: 0.8rem;
  }

  .bslp-day-off-info-tooltip {
    color: #00000070;
    padding-left: 0.3em;
    cursor: help;
  }

  .blsp-day-off-tooltip {
    pointer-events: none;
    opacity: 0;
    top: 20px;
    left: 90px;
  }

  .bslp-day-off-info-tooltip:hover + .blsp-day-off-tooltip {
    pointer-events: auto;
    opacity: 1;
  }
</style>
