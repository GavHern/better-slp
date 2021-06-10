<script lang="ts">
  export let gpa: number | null;
  gpa !== null ? gpa : "N/A"; // Set GPA to N/A if there is no data
</script>

<style>
  .grade-row {
    margin-top: 2.5rem;
  }

  .grade-column {
    border: none;
  }
</style>

<div class="better-slp-gpa-estimate grade-row list-group-item">
  <div class="row">
    <div class="course-name-column col-xs-6 course-name">GPA Estimate</div>
    <div class="grade-column middle-column col-xs-5">
      <span class="current-grade grade letter-grade">{gpa}</span>
    </div>
  </div>
</div>