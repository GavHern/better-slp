import { getCurrentAcademicYear } from './methods';

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

async function appendQuickSwitcherToDOM(): Promise<void> {
  const quickSwitcherContainer = document.createElement('div');
  const quickSwitcherContentWrapper = document.createElement('div');
  const quickSwitcherTextInput = document.createElement('input');
  const quickSwitcherResultsContainer = document.createElement('div');

  quickSwitcherContainer.className = "better-slp-quick-switcher-container";
  quickSwitcherTextInput.type = "text";
  quickSwitcherTextInput.placeholder = "Search...";

  quickSwitcherContainer.appendChild(quickSwitcherContentWrapper);
  quickSwitcherContentWrapper.appendChild(quickSwitcherTextInput);
  quickSwitcherContentWrapper.appendChild(quickSwitcherResultsContainer);

  document.body.appendChild(quickSwitcherContainer);

  quickSwitcherTextInput.focus();

  const response = await getQuickSwitcherAPIData();

  if(response === null) return;

  const resultList = parseQuickSwitcherAPIResponse(response); 

  function fieldEditCallback(): void {
    quickSwitcherResultsContainer.innerHTML = '';

    quickSwitcherTextInput.focus();
   
    if(quickSwitcherTextInput.value.length == 0) return;

    let filteredResults = resultList.filter((result:searchResult) => {return result.title.toLowerCase().includes(quickSwitcherTextInput.value.toLowerCase())});

    filteredResults.forEach(item => {
      const searchResultItem = document.createElement('a');
      const searchResultItemContentWrapper = document.createElement('div');
      const searchResultSubtitle = document.createElement('h6');
      const searchResultTitle = document.createElement('div');

      searchResultItem.setAttribute('href', item.link);
      searchResultSubtitle.innerText = item.subtitle ?? '';
      searchResultTitle.innerText = item.title;

      if(item.subtitle != null) searchResultItemContentWrapper.appendChild(searchResultSubtitle);
      searchResultItemContentWrapper.appendChild(searchResultTitle);

      searchResultItem.appendChild(searchResultItemContentWrapper);

      quickSwitcherResultsContainer.appendChild(searchResultItem);
    })

  }
  
  quickSwitcherTextInput.addEventListener('keydown', function(e){setTimeout(()=>{
    if(["ArrowUp","ArrowDown"].includes(e.key)) return; // Return if arrow key is pressed
    fieldEditCallback()},0)}
  );

  quickSwitcherTextInput.addEventListener('paste', function(){setTimeout(()=>{fieldEditCallback()},0)});
  quickSwitcherTextInput.addEventListener('change', function(){setTimeout(()=>{fieldEditCallback()},0)});
  fieldEditCallback();

  quickSwitcherContainer.addEventListener('keydown', e => {
    switch(e.key){
      case "ArrowUp":
        e.preventDefault();
        
        if([quickSwitcherTextInput, quickSwitcherResultsContainer.firstChild].includes(document.activeElement)){
          (quickSwitcherResultsContainer.lastChild as HTMLElement)?.focus();
        } else {
          if(document.activeElement === null) return;
          const results = [...quickSwitcherResultsContainer.children];
          const nextItem = results.indexOf(document.activeElement) - 1;
          const nextResult = <HTMLElement>quickSwitcherResultsContainer.children[nextItem];

          nextResult.focus();
        };

        break;
      case "ArrowDown":
        e.preventDefault();
        
        if([quickSwitcherTextInput, quickSwitcherResultsContainer.lastChild].includes(document.activeElement)){
          (quickSwitcherResultsContainer.firstChild as HTMLElement)?.focus();
        } else {
          if(document.activeElement === null) return;
          const results = [...quickSwitcherResultsContainer.children];
          const nextItem = results.indexOf(document.activeElement) + 1;
          const nextResult = <HTMLElement>quickSwitcherResultsContainer.children[nextItem];

          nextResult.focus();
        };

        break;
      case "Enter":case "Tab": break;
      default:
        quickSwitcherTextInput.focus();
    }
  }, {capture: true})
}

export default function openQuickSwitcher(toggleState: boolean): void {
  const existingInstances = document.querySelectorAll('.better-slp-quick-switcher-container');

  if(!toggleState || existingInstances.length != 0) { // Check if the toggle state says the quick switcher should be closed OR if there are already existing instances of the quick switcher
    existingInstances.forEach(instance => { // Remove all instances
      instance.remove();
    });
    return; // Terminate function
  }

  // Open quick switcher
  appendQuickSwitcherToDOM();
}