<script lang="ts">
  let unweighted = 3.94;
  let weighted = 4.29;
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
  <li class="grade-row list-group-item">
    <div class="row">
      <div class="course-name-column col-xs-6">
        <span class="course-name">Unweighted</span>
      </div>
      <div class="grade-column col-xs-5">
        <span class="current-grade grade">
          <span class="letter-grade">{unweighted}</span>
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
          <span class="letter-grade">{weighted}</span>
        </span>
      </div>
    </div>
  </li>
</div>

<style>
  .bslp-gpa-info-tooltip {
    color: #00000070;
    padding-left: 0.3em;
    cursor: help;
  }
</style>
