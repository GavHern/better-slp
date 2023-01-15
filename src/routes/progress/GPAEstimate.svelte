<script lang="ts">
  let res = fetch("https://www.summitlearning.org/my/progress.json").then(
    (res) => res.json()
  );

  const calculateGPA = (weighted, data) => {
    return 4;
  };

  const formatNumber = (number) =>
    new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(number);
</script>

<div class="claro-list-group sdl-course-grades list-group">
  <span class="grade-header list-group-item">
    <div class="row">
      <div class="col-xs-6 flex">
        <h2 class="courses-title">GPA Estimate</h2>

        <i class="material-icons material-icons-default bslp-gpa-info-tooltip">
          help_outline
        </i>
      </div>
    </div>
  </span>
  {#await res}
    <div class="loading-indicator-icon large" />
  {:then data}
    {@const unweighted = calculateGPA(false, data)}
    {@const weighted = calculateGPA(true, data)}
    <li class="grade-row list-group-item">
      <div class="row">
        <div class="course-name-column col-xs-6">
          <span class="course-name">Unweighted</span>
        </div>
        <div class="grade-column col-xs-5">
          <span class="current-grade grade">
            <span class="letter-grade">{formatNumber(unweighted)}</span>
          </span>
        </div>
      </div>
    </li>
    <li class="grade-row list-group-item">
      <div class="row">
        <div class="course-name-column col-xs-6">
          <span class="course-name">Weighted</span>
        </div>
        <div class="grade-column col-xs-5">
          <span class="current-grade grade">
            <span class="letter-grade">{formatNumber(unweighted)}</span>
          </span>
        </div>
      </div>
    </li>
  {:catch}
    There was an error calculating GPA estimates.
  {/await}
</div>

<style>
  .loading-indicator-icon {
    margin-top: 1.5em;
  }

  .bslp-gpa-info-tooltip {
    color: #00000070;
    padding-left: 0.3em;
    cursor: help;
  }
</style>
