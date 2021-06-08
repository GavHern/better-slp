import 'regenerator-runtime/runtime';

import openQuickSwitcher from './modules/quickSwitcher';

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