"use strict";
const letterGradeScale = {
    "A+": { percentage: 0.97, gpa: 4.0 },
    "A": { percentage: 0.93, gpa: 4.0 },
    "A-": { percentage: 0.90, gpa: 3.7 },
    "B+": { percentage: 0.87, gpa: 3.3 },
    "B": { percentage: 0.83, gpa: 3.0 },
    "B-": { percentage: 0.80, gpa: 2.7 },
    "C+": { percentage: 0.77, gpa: 2.3 },
    "C": { percentage: 0.73, gpa: 2.0 },
    "C-": { percentage: 0.70, gpa: 1.7 },
    "D+": { percentage: 0.67, gpa: 1.3 },
    "D": { percentage: 0.65, gpa: 1.0 },
    "F": { percentage: 0.00, gpa: 0.0 }
};
function getCurrentAcademicYear() {
    const date = new Date();
    return date.getFullYear() + (date.getMonth() > 5 ? 1 : 0);
}
function enableDarkMode(toggleState, animation = true) {
    if (animation) {
        document.documentElement.classList.add('better-slp-dark-mode-transitioning');
        setTimeout(() => { document.documentElement.classList.remove('better-slp-dark-mode-transitioning'); }, 300);
    }
    if (!toggleState) {
        document.documentElement.setAttribute('better-slp-dark-mode', 'false');
        return;
    }
    document.documentElement.setAttribute('better-slp-dark-mode', 'true');
}
async function getQuickSwitcherAPIData() {
    const responseRaw = await fetch(`https://www.summitlearning.org/my/year/${getCurrentAcademicYear().toString()}.json`);
    if (responseRaw.status >= 400 && responseRaw.status < 600) {
        alert("A network error occurred");
        openQuickSwitcher(false);
        return null;
    }
    const response = await responseRaw.json();
    return response;
}
function parseQuickSwitcherAPIResponse(response) {
    let resultList = [];
    response.courses.forEach((course) => {
        resultList.push({
            title: course.name,
            subtitle: 'Course',
            link: `https://www.summitlearning.org/my/courses/${course.id}/v2`
        });
    });
    response.projects.forEach((project) => {
        const projectCourseId = response.projectCourses.filter((courseProject) => { return courseProject.projectId == project.id; })[0].courseId;
        const projectCourseName = response.courses.filter((courses) => { return courses.id == projectCourseId; })[0].name;
        resultList.push({
            title: project.name,
            subtitle: `Project • ${projectCourseName}`,
            link: `https://www.summitlearning.org/my/projects/${project.id}/overview`
        });
    });
    response.focusAreas.forEach((focusArea) => {
        const focusAreaAdditionalInformation = response.courseFocusAreas.filter((courseFocusArea) => { return courseFocusArea.knowDoId == focusArea.id; })[0];
        if (focusAreaAdditionalInformation == undefined)
            return;
        const focusAreaCourseName = response.courses.filter((courses) => { return courses.id == focusAreaAdditionalInformation.courseId; })[0].name;
        let focusAreaType;
        switch (focusAreaAdditionalInformation.level) {
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
async function appendQuickSwitcherToDOM() {
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
    if (response === null)
        return;
    const resultList = parseQuickSwitcherAPIResponse(response);
    function fieldEditCallback() {
        quickSwitcherResultsContainer.innerHTML = '';
        quickSwitcherTextInput.focus();
        if (quickSwitcherTextInput.value.length == 0)
            return;
        let filteredResults = resultList.filter((result) => { return result.title.toLowerCase().includes(quickSwitcherTextInput.value.toLowerCase()); });
        filteredResults.forEach(item => {
            const searchResultItem = document.createElement('a');
            const searchResultItemContentWrapper = document.createElement('div');
            const searchResultSubtitle = document.createElement('h6');
            const searchResultTitle = document.createElement('div');
            searchResultItem.setAttribute('href', item.link);
            searchResultSubtitle.innerText = item.subtitle ?? '';
            searchResultTitle.innerText = item.title;
            if (item.subtitle != null)
                searchResultItemContentWrapper.appendChild(searchResultSubtitle);
            searchResultItemContentWrapper.appendChild(searchResultTitle);
            searchResultItem.appendChild(searchResultItemContentWrapper);
            quickSwitcherResultsContainer.appendChild(searchResultItem);
        });
    }
    quickSwitcherTextInput.addEventListener('keydown', function (e) {
        setTimeout(() => {
            if (["ArrowUp", "ArrowDown"].includes(e.key))
                return;
            fieldEditCallback();
        }, 0);
    });
    quickSwitcherTextInput.addEventListener('paste', function () { setTimeout(() => { fieldEditCallback(); }, 0); });
    quickSwitcherTextInput.addEventListener('change', function () { setTimeout(() => { fieldEditCallback(); }, 0); });
    fieldEditCallback();
    quickSwitcherContainer.addEventListener('keydown', e => {
        switch (e.key) {
            case "ArrowUp":
                e.preventDefault();
                if ([quickSwitcherTextInput, quickSwitcherResultsContainer.firstChild].includes(document.activeElement)) {
                    quickSwitcherResultsContainer.lastChild?.focus();
                }
                else {
                    if (document.activeElement === null)
                        return;
                    const results = [...quickSwitcherResultsContainer.children];
                    const nextItem = results.indexOf(document.activeElement) - 1;
                    const nextResult = quickSwitcherResultsContainer.children[nextItem];
                    nextResult.focus();
                }
                ;
                break;
            case "ArrowDown":
                e.preventDefault();
                if ([quickSwitcherTextInput, quickSwitcherResultsContainer.lastChild].includes(document.activeElement)) {
                    quickSwitcherResultsContainer.firstChild?.focus();
                }
                else {
                    if (document.activeElement === null)
                        return;
                    const results = [...quickSwitcherResultsContainer.children];
                    const nextItem = results.indexOf(document.activeElement) + 1;
                    const nextResult = quickSwitcherResultsContainer.children[nextItem];
                    nextResult.focus();
                }
                ;
                break;
            case "Enter":
            case "Tab": break;
            default:
                quickSwitcherTextInput.focus();
        }
    }, { capture: true });
}
function openQuickSwitcher(toggleState) {
    const existingInstances = document.querySelectorAll('.better-slp-quick-switcher-container');
    if (!toggleState || existingInstances.length != 0) {
        existingInstances.forEach(instance => {
            instance.remove();
        });
        return;
    }
    appendQuickSwitcherToDOM();
}
function initialize() {
    chrome.storage.sync.set({ darkMode: true });
    chrome.storage.sync.get('darkMode', items => {
        if (items.darkMode)
            enableDarkMode(true, false);
    });
    window.addEventListener('keydown', e => {
        switch (true) {
            case e.key == 'k' && e.ctrlKey:
                const notebookFocused = document.querySelectorAll('.ProseMirror-focused').length > 0;
                if (notebookFocused)
                    return;
                e.preventDefault();
                openQuickSwitcher(true);
                break;
            case e.key == 'Escape':
                openQuickSwitcher(false);
        }
    }, { capture: true });
}
initialize();
