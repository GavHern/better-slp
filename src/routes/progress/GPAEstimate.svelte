<script lang="ts">
  import { parseAPIResponse, neededProgressYears, getDataFromAllPreviousAcademicYears, formatGPA } from "./gpa";

  export let req;

  let res = req.then(async (data) => {
    const info = parseAPIResponse(data);
    const years = neededProgressYears(data.courses);

    return await getDataFromAllPreviousAcademicYears(years, info);
  });
</script>

<div class="bslp-route-specific claro-list-group sdl-course-grades list-group">
  <span class="grade-header list-group-item">
    <div class="row">
      <div class="col-xs-6 bslp-gpa-section-title-container flex">
        <h2 class="courses-title">GPA Estimate</h2>

        <i class="material-icons material-icons-default bslp-gpa-info-tooltip"> help_outline </i>

        <div role="tooltip" class="fade in tooltip bottom blsp-gpa-tooltip">
          <div class="tooltip-arrow" style="left: 50%;" />
          <div class="tooltip-inner">
            A rough estimate based on your current platform grades from all high school years. UC approved expedition
            courses are not included. Review your report card for more accuracy. <i>Could</i> take up to 24 hours to update.
          </div>
        </div>
      </div>
    </div>
  </span>
  {#await res}
    <div class="loading-indicator-icon large" />
  {:then { unweighted, weighted }}
    <li class="grade-row list-group-item">
      <div class="row">
        <div class="course-name-column col-xs-6">
          <span class="course-name">Unweighted</span>
        </div>
        <div class="grade-column col-xs-5">
          <span class="current-grade grade">
            <span class="letter-grade">{formatGPA(unweighted)}</span>
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
            <span class="letter-grade">{formatGPA(weighted)}</span>
          </span>
        </div>
      </div>
    </li>
  {:catch err}
    There was an error calculating GPA estimates.
  {/await}
</div>

<style lang="stylus">
  .loading-indicator-icon
    margin-top: 1.5em

  .bslp-gpa-info-tooltip
    color: #00000070
    padding-left: 0.3em
    cursor: help

  	&:hover + .blsp-gpa-tooltip
			pointer-events: auto
			opacity: 1

  .blsp-gpa-tooltip
    pointer-events: none
    opacity: 0
    top: 20px
    left: 37px

  .bslp-gpa-section-title-container
    width: 100%
</style>
