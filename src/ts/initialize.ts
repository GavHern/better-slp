const letterGradeScale = {
  "A+": {percentage: 0.97, gpa: 4.0},
  "A" : {percentage: 0.93, gpa: 4.0},
  "A-": {percentage: 0.90, gpa: 3.7},
  "B+": {percentage: 0.87, gpa: 3.3},
  "B" : {percentage: 0.83, gpa: 3.0},
  "B-": {percentage: 0.80, gpa: 2.7},
  "C+": {percentage: 0.77, gpa: 2.3},
  "C" : {percentage: 0.73, gpa: 2.0},
  "C-": {percentage: 0.70, gpa: 1.7},
  "D+": {percentage: 0.67, gpa: 1.3},
  "D" : {percentage: 0.65, gpa: 1.0},
  "F" : {percentage: 0.00, gpa: 0.0}
}

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

function initialize(): void {
  chrome.storage.sync.set({darkMode: true});

  chrome.storage.sync.get('darkMode', items => {
    if(items.darkMode) enableDarkMode(true, false);
  });

  // Keyboard Shortcuts
  window.addEventListener('keydown', e => {
    switch(true){
      case e.key == 'k' && e.ctrlKey: // Ctrl+k
        // Return if the current focused element is in a notebook document. This is to prevent interfering with the `insert link` shortcut
        const notebookFocused = document.querySelectorAll('.ProseMirror-focused').length > 0;
        if(notebookFocused) return;

        e.preventDefault();
        openQuickSwitcher(true);
        break;
      case e.key == 'Escape': // Escape
        openQuickSwitcher(false);
    }
  }, {capture: true});
}

initialize();