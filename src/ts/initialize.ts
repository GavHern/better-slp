function getCurrentAcademicYear(): number {
  const date = new Date();
  return date.getFullYear() + (date.getMonth() > 5 ? 1 : 0);
}

function enableDarkMode(toggleState: boolean, animation: boolean = true): void {

  if(animation){ // Apply a css animation if needed
    document.documentElement.classList.add('better-slp-dark-mode-transitioning');
    setTimeout(() => {document.documentElement.classList.remove('better-slp-dark-mode-transitioning')}, 300);
  }

  if(!toggleState){
    document.documentElement.setAttribute('better-slp-dark-mode', 'false'); // Disable dark mode attribute on the html tag
    return;
  }

  document.documentElement.setAttribute('better-slp-dark-mode', 'true'); // Enable dark mode attribute on the html tag

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

  const responseRaw = await fetch('https://www.summitlearning.org/my/year/2021.json');

  if(responseRaw.status >= 400 && responseRaw.status < 600) {
    alert("A network error occurred");
    openQuickSwitcher(false);
  }

  const response: any = await responseRaw.json();

  console.log(response)

  interface searchResult {
    title: string;
    subtitle: string;
    link: string;
  }

  let resultList: searchResult[] = [];

  // Courses
  response.courses.forEach((course: any) => {
    resultList.push({
      title: course.name,
      subtitle: 'Course',
      link: `https://www.summitlearning.org/my/courses/${course.id}/v2`
    });
  });

  // Projects
  response.projects.forEach((project: any) => {
    const projectCourseId = response.projectCourses.filter((courseProject: any) => {return courseProject.projectId == project.id})[0].courseId;
    const projectCourseName = response.courses.filter((courses: any) => {return courses.id == projectCourseId})[0].name;
    resultList.push({
      title: project.name,
      subtitle: `Project • ${projectCourseName}`,
      link: `https://www.summitlearning.org/my/projects/${project.id}/overview`
    });
  });

  // Focus Areas
  response.focusAreas.forEach((focusArea: any) => {
    const focusAreaAdditionalInformation = response.courseFocusAreas.filter((courseFocusArea: any) => {return courseFocusArea.knowDoId == focusArea.id})[0];
    if(focusAreaAdditionalInformation == undefined) return;
    const focusAreaCourseName = response.courses.filter((courses: any) => {return courses.id == focusAreaAdditionalInformation.courseId})[0].name;

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

  console.log(resultList);

  function fieldEditCallback(): void {
    quickSwitcherResultsContainer.innerHTML = '';
   
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
  
  quickSwitcherTextInput.addEventListener('keydown', function(){setTimeout(()=>{fieldEditCallback()},0)});
  quickSwitcherTextInput.addEventListener('paste', function(){setTimeout(()=>{fieldEditCallback()},0)});
  quickSwitcherTextInput.addEventListener('change', function(){setTimeout(()=>{fieldEditCallback()},0)});
  fieldEditCallback();
}

function openQuickSwitcher(toggleState: boolean): void {
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

function initialize(): void {
  chrome.storage.sync.get('darkMode', items => {
    if(items.darkMode) enableDarkMode(true, false);
  });

  chrome.storage.sync.set({darkMode: true});

  // Keyboard Shortcuts
  window.addEventListener('keydown', e => {
    switch(true){
      case e.key == 'k' && e.ctrlKey: // Ctrl+k
        e.preventDefault();
        openQuickSwitcher(true);
        break;
      case e.key == 'Escape': // Escape
        openQuickSwitcher(false);
    }
  });
}

initialize();