import { getCurrentAcademicYear } from './methods';
// @ts-ignore
import QuickSwitcher from '../../components/QuickSwitcher.svelte';

async function getQuickSwitcherAPIData(): Promise<SummitLearningYearAPI | null>{
  const responseRaw = await fetch(`https://www.summitlearning.org/my/year/${getCurrentAcademicYear().toString()}.json`);

  if(responseRaw.status >= 400 && responseRaw.status < 600) {
    alert("A network error occurred");
    openQuickSwitcher(false);
    return null;
  }

  const response: SummitLearningYearAPI = await responseRaw.json();

  return response;
}

function parseQuickSwitcherAPIResponse(response: SummitLearningYearAPI): searchResult[] {
  let resultList: searchResult[] = [];

  // Courses
  response.courses.forEach((course: SummitLearningCourses) => {
    resultList.push({
      title: course.name,
      subtitle: 'Course',
      link: `https://www.summitlearning.org/my/courses/${course.id}/v2`
    });
  });

  // Projects
  response.projects.forEach((project: SummitLearningProjects) => {
    const projectCourseId = response.projectCourses.filter((courseProject: SummitLearningProjectCourses) => {return courseProject.projectId == project.id})[0].courseId;
    const projectCourseName = response.courses.filter((courses: SummitLearningCourses) => {return courses.id == projectCourseId})[0].name;
    resultList.push({
      title: project.name,
      subtitle: `Project • ${projectCourseName}`,
      link: `https://www.summitlearning.org/my/projects/${project.id}/overview`
    });
  });

  // Focus areas
  response.focusAreas.forEach((focusArea: SummitLearningFocusAreas) => {
    const focusAreaAdditionalInformation = response.courseFocusAreas.filter((courseFocusArea: summitLearningCourseFocusAreas) => {return courseFocusArea.knowDoId == focusArea.id})[0];
    if(focusAreaAdditionalInformation == undefined) return;
    const focusAreaCourseName = response.courses.filter((courses: SummitLearningCourses) => {return courses.id == focusAreaAdditionalInformation.courseId})[0].name;

    let focusAreaType: string;
    switch(focusAreaAdditionalInformation.level){
      case 3:
        focusAreaType = "Power";
        break;
      case 2:
        focusAreaType = "Additional";
        break;
      case 1:
        focusAreaType = "Challenge";
        break;
      default:
        focusAreaType = "";
    }

    resultList.push({
      title: focusArea.name,
      subtitle: `${focusAreaType} Focus Area • ${focusAreaCourseName}`,
      link: `https://www.summitlearning.org/my/focusareas/${focusArea.id}`
    });
  });

  return resultList;
}

export default async function openQuickSwitcher(toggleState: boolean): Promise<void> {
  const existingInstances = document.querySelectorAll('.better-slp-quick-switcher-container');

  if(!toggleState || existingInstances.length != 0) { // Check if the toggle state says the quick switcher should be closed OR if there are already existing instances of the quick switcher
    existingInstances.forEach(instance => { // Remove all instances
      instance.remove();
    });
    return; // Terminate function
  }

	new QuickSwitcher({
		target: document.body,
		props: {
			getQuickSwitcherAPIData: getQuickSwitcherAPIData(),
			parseQuickSwitcherAPIResponse: parseQuickSwitcherAPIResponse,
		}
	})
}