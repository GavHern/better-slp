<script lang="ts">
  const gpaScale = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0,
  };

  const mean = (arr) => arr.reduce((a, b) => a + b) / arr.length;

  // Turns the api repsonse into summarized data. {grade, isAP, isExpedition}
  const parseAPIResponse = (res: any) =>
    res.courseAssignments
      .map((a) => ({
        grade: a.letter_grade,
        isAP: res.courses
          .filter((c) => c.id === a.course_id)[0]
          .name?.includes("AP "),
        isExpedition:
          res.courses.filter((c) => c.id === a.course_id)[0].subjectId === 10,
        name: res.courses.filter((c) => c.id === a.course_id)[0].name,
      }))
      .filter((grade) => !grade.isExpedition && grade.grade !== "N/A");

  // Averages a list of letter grades
  const calculateYearAverage = (weighted, grades: any[]) => {
    const gpaList = grades.map(
      (grade) => gpaScale[grade.grade] + grade.isAP * weighted
    );
    return mean(gpaList);
  };

  // prettier-ignore
  const mode = (a) => Object.values(a.reduce((count,e)=>{if(!(e in count)){count[e]=[0, e];}count[e][0]++;return count;},{})).reduce((a, v) => (v[0] < a[0] ? a : v), [0, null])[1];

  // Finds all previous high school academic years
  const neededProgressYears = (data: any) => {
    const gradeLevel = mode(data.map((d) => d.gradeLevel));
    const academicYear = mode(data.map((d) => d.academicYear));

    const neededGradeLevels = gradeLevel - 9; // 0 needed in 9th grade, 3 needed in 12th

    let years = [];

    for (let i = 1; i <= neededGradeLevels; i++) {
      years.push(academicYear - i);
    }

    return years;
  };

  const getAllPreviousAcademicYears = async (years: number[], initialInfo) => {
    const memoized = JSON.parse(
      window.localStorage.getItem("bslp-memoized-gpa")
    );

    if (
      memoized == null ||
      (new Date().getTime() - memoized.timestamp) / 1000 > 86400
    ) {
      const previous = await Promise.all(
        years.map((year) =>
          fetch(`https://www.summitlearning.org/my/progress/year/${year}.json`)
        )
      );

      const json = await Promise.all(previous.map((res) => res.json()));

      const parsed = json.map((data) => parseAPIResponse(data));
      parsed.push(initialInfo);

      const unweighted = mean(
        parsed.map((data) => calculateYearAverage(false, data))
      );
      const weighted = mean(
        parsed.map((data) => calculateYearAverage(true, data))
      );

      window.localStorage["bslp-memoized-gpa"] = JSON.stringify({
        unweighted,
        weighted,
        timestamp: new Date().getTime(),
      });

      return { unweighted, weighted };
    } else {
      return memoized;
    }
  };

  let res = fetch("https://www.summitlearning.org/my/progress.json")
    .then((res) => res.json())
    .then(async (data) => {
      const info = parseAPIResponse(data);
      const years = neededProgressYears(data.courses);

      return await getAllPreviousAcademicYears(years, info);
    });

  const formatNumber = (number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
</script>

<div class="bslp-route-specific claro-list-group sdl-course-grades list-group">
  <span class="grade-header list-group-item">
    <div class="row">
      <div class="col-xs-6 flex">
        <h2 class="courses-title">GPA Estimate</h2>

        <i class="material-icons material-icons-default bslp-gpa-info-tooltip">
          help_outline
        </i>

        <div
          role="tooltip"
          class="fade in tooltip bottom blsp-gpa-tooltip"
          style="top: 20px; right: -71px;"
        >
          <div class="tooltip-arrow" style="left: 50%;" />
          <div class="tooltip-inner">
            A rough estimate based on your current platform grades. UC approved
            expedition courses are not included. Review your report card for
            more accuracy. GPA estimate updates every 30 minutes.
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
            <span class="letter-grade">{formatNumber(weighted)}</span>
          </span>
        </div>
      </div>
    </li>
  {:catch err}
    {@const a = console.log(err)}
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

  .blsp-gpa-tooltip {
    pointer-events: none;
    opacity: 0;
  }

  .bslp-gpa-info-tooltip:hover + .blsp-gpa-tooltip {
    pointer-events: auto;
    opacity: 1;
  }
</style>
