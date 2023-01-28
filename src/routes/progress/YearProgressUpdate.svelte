<script lang="ts">
  export let req;

  let res = req;
  let loaded = false;

  let weeks;
  let days;
  let hours;
  let minutes;
  let seconds;

  const format = (num) =>
    Intl.NumberFormat("en-US", {
      minimumIntegerDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);

  const updateDaysUntil = (date: Date) => {
    let delta = Math.abs(date.getTime() - new Date().getTime()) / 1000;
    weeks = Math.floor(delta / 604800);
    delta -= weeks * 604800;
    days = Math.floor(delta / 86400);
    delta -= days * 86400;
    hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    seconds = Math.floor(delta % 60); // in theory the modulus is not required
  };

  const getLastDay = (data) => {
    if (loaded) return;
    loaded = true;

    const thisYear = data.at(-1);
    const lastDay = new Date(thisYear.lastDayOfSchool);

    updateDaysUntil(lastDay);
    setInterval(() => {
      updateDaysUntil(lastDay);
    }, 1000);

    return lastDay;
  };
</script>

<div class="bslp-route-specific claro-list-group sdl-course-grades list-group">
  <span class="grade-header list-group-item">
    <div class="row">
      <div class="col-xs-12 flex">
        <h2 class="courses-title">Time Remaining This Year</h2>
      </div>
    </div>
  </span>
  {#await res}
    <div class="loading-indicator-icon large" />
  {:then { schoolYears }}
    {@const lastDay = getLastDay(schoolYears)}
    <li class="grade-row list-group-item bslp-time-left">
      {weeks} weeks, {days} days, {format(hours)}:{format(minutes)}:{format(seconds)}
    </li>
  {:catch err}
    There was an error loading your year progress update.
  {/await}
</div>

<style>
  .loading-indicator-icon {
    margin-top: 1.5em;
  }

  .bslp-time-left {
    color: #5751d2 !important;
    font-size: 17px;
    font-weight: bold;
  }
</style>
