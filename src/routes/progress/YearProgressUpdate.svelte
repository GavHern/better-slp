<script lang="ts">
  import { formatLongDate } from "./formatDates";

  export let res;

  let loaded = false;
  let view = window.localStorage.getItem("bslp-year-progress-view") ?? "countdown";

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

  const getMotivationalMessage = () => {
    let message;

    switch (true) {
      case weeks > 30:
        message = "It'll come faster than you think!";
        break;
      case weeks < 8 && weeks > 4:
        message = "Summer's coming up, hang in there!";
        break;
      case weeks <= 4 && weeks > 0:
        message = "Almost there!";
        break;
      case weeks == 0:
        message = "One more week!";
        break;
      default: //? Add more things here, it will pick a random one
        const randomMessages = ["Keep up the hard work!"];
        message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    }

    return message;
  };

  const cycleView = () => {
    switch (view) {
      case "countdown":
        view = "time-left";
        window.localStorage.setItem("bslp-year-progress-view", "time-left");
        break;
      case "time-left":
        view = "date";
        window.localStorage.setItem("bslp-year-progress-view", "date");
        break;
      case "date":
        view = "countdown";
        window.localStorage.setItem("bslp-year-progress-view", "countdown");
        break;
    }
  };
</script>

<div class="bslp-route-specific claro-list-group sdl-course-grades list-group">
  <span class="grade-header list-group-item">
    <div class="row">
      <div class="col-xs-12 flex">
        <h2 class="courses-title">{view === "date" ? "Last Day of School" : "Time Remaining This Year"}</h2>
      </div>
    </div>
  </span>
  {#await res}
    <div class="loading-indicator-icon large" />
  {:then { schoolYears }}
    {@const lastDay = getLastDay(schoolYears)}
    <li class="grade-row list-group-item bslp-time-left">
      <button on:click={cycleView}>
        {#if view === "countdown"}
          {weeks} weeks, {days} days, {format(hours)}:{format(minutes)}:{format(seconds)}
        {:else if view === "time-left"}
          {weeks} weeks<span class="bslp-vertical-divider" />{weeks * 7 + days} days
        {:else if view === "date"}
          {formatLongDate(schoolYears.at(-1).lastDayOfSchool)}
        {/if}
      </button>
      <div class="bslp-time-left-motivational-message">{getMotivationalMessage()}</div>
    </li>
  {:catch err}
    There was an error loading your year progress update.
  {/await}
</div>

<style lang="stylus">
  .loading-indicator-icon
    margin-top: 1.5em

  .bslp-time-left
    color: #5751d2 !important
    font-size: 17px
    font-weight: bold

  .bslp-time-left-motivational-message
    color: var(--eds-theme-color-text-neutral-subtle)
    font-size: 0.8rem

  .bslp-vertical-divider
    height: 100%
    width: 0
    border-right: 2px solid #c0c4c8
    margin-inline: 0.7ch
</style>
