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
  "I": 0.0,
};

// Average calculation formulas
const mean = (arr) => arr.reduce((a, b) => a + b) / arr.length;
const mode = (a) =>
  Object.values(
    a.reduce((count, e) => {
      if (!(e in count)) {
        count[e] = [0, e];
      }
      count[e][0]++;
      return count;
    }, {})
  ).reduce((a, v) => (v[0] < a[0] ? a : v), [0, null])[1];

// Turns the api repsonse into summarized data. {grade, isAP, isExpedition}
export const parseAPIResponse = (res: any) =>
  res.courseAssignments
    .map((a) => ({
      grade: a.letter_grade,
      isAP: res.courses.filter((c) => c.id === a.course_id)[0].name?.includes("AP "),
      isExpedition: res.courses.filter((c) => c.id === a.course_id)[0].subjectId === 10,
    }))
    .filter(({isExpedition, grade}) => !isExpedition && grade !== "N/A");

// Averages a list of letter grades
const calculateYearAverage = (weighted, grades: any[]) => {
  const gpaList = grades.map((grade) => gpaScale[grade.grade] + grade.isAP * weighted);
  return mean(gpaList);
};

// Finds all previous high school academic years
export const neededProgressYears = (data: any) => {
  const gradeLevel = mode(data.map((d) => d.gradeLevel));
  const academicYear = mode(data.map((d) => d.academicYear));

  const neededGradeLevels = gradeLevel - 9; // 0 needed in 9th grade, 3 needed in 12th

  if (neededGradeLevels < 0) {
    // TODO: Add fallback if user is not in high school
  }

  let years = [];

  for (let i = 1; i <= neededGradeLevels; i++) {
    years.push(academicYear - i);
  }

  return years;
};

export const getDataFromAllPreviousAcademicYears = async (years: number[], initialInfo) => {
  let parsed;

  const memoized = JSON.parse(window.localStorage.getItem("bslp-memoized-gpa"));

  if (memoized == null || (new Date().getTime() - memoized.timestamp) / 1000 > 86400) {
    const previous = await Promise.all(
      years.map((year) => fetch(`https://www.summitlearning.org/my/progress/year/${year}.json`))
    );

    const json = await Promise.all(previous.map((res) => res.json()));

    parsed = json.map((data) => parseAPIResponse(data));

    // Memoize old values
    window.localStorage["bslp-memoized-gpa"] = JSON.stringify({
      parsed,
      timestamp: new Date().getTime(),
    });
  } else {
    parsed = memoized.parsed;
  }

  parsed.push(initialInfo);

  const unweighted = mean(parsed.map((data) => calculateYearAverage(false, data)));
  const weighted = mean(parsed.map((data) => calculateYearAverage(true, data)));

  return { unweighted, weighted };
};

// Forces 2 decimal places
export const formatGPA = (number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
