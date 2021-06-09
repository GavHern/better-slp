import { letterGradeScale } from './data';
import { getAverage } from './methods';

function getGPA(grades: LetterGrade[]): number | null {

  if(grades.every(e => {
    return !Object.keys(letterGradeScale).includes(e)
  })) return null;

  const gradePoints = [] as number[];

  grades.forEach(grade => {
    if(Object.keys(letterGradeScale).includes(grade)) gradePoints.push(letterGradeScale[grade].gpa);
  })

  const gpa = getAverage(gradePoints);

  return Math.round(gpa * 100) / 100;
}


function getLetterGrades(): LetterGrade[] {
  const letterGrades = [] as LetterGrade[];
  
  document.querySelectorAll('.current-grade .letter-grade').forEach(e => {
    letterGrades.push(<LetterGrade>e.innerHTML);
  });

  return letterGrades;
}

function createGPAElement(gpa: number | null): HTMLElement {
  const container = document.createElement('div');
  container.setAttribute('class', 'better-slp-gpa-estimate grade-row list-group-item');

  const contentRow = document.createElement('div');
  contentRow.setAttribute('class', 'row');
  container.appendChild(contentRow);

  const label = document.createElement('div');
  label.setAttribute('class', 'course-name-column col-xs-6 course-name');
  label.textContent = "GPA Estimate";
  contentRow.appendChild(label);

  const gpaContainer = document.createElement('div');
  gpaContainer.setAttribute('class', 'grade-column middle-column col-xs-5');
  contentRow.appendChild(gpaContainer);

  const gpaText = document.createElement('span');
  gpaText.setAttribute('class', 'current-grade grade letter-grade');

  gpaText.textContent = (gpa !== null) ? gpa.toString() : "N/A";
  
  
  gpaContainer.appendChild(gpaText);


  return container;
}

export function appendGPAEstimate(): void {
  const gpa = getGPA(getLetterGrades());
  const gpaAverageElement = createGPAElement(gpa);
  document.querySelector('.sdl-course-grades')?.appendChild(gpaAverageElement);
}