import { letterGradeScale } from './data';
import { getAverage } from './methods';
// @ts-ignore
import GPAComponent from '../../components/GPA.svelte';
// @ts-ignore
import YearProgress from '../../components/YearProgress.svelte';

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
    letterGrades.push( <LetterGrade> e.innerHTML );
  });

  return letterGrades;
}

export function appendGPAEstimate() {
  const gpa = getGPA(getLetterGrades());
  const injectionParent = document.querySelector('.sdl-course-grades');
  if(injectionParent === null) return;

  new GPAComponent({
    target: injectionParent,
    props: {
      gpa: gpa
    }
  })

	new YearProgress({
    target: document.querySelector('.claro-sdl-progress .panel-body .col-md-4')
  })
}