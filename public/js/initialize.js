"use strict";
function enableDarkMode(toggleState, animation = true) {
    if (animation) { // Apply a css animation if needed
        document.documentElement.classList.add('better-slp-dark-mode-transitioning');
        setTimeout(() => { document.documentElement.classList.remove('better-slp-dark-mode-transitioning'); }, 300);
    }
    if (!toggleState) {
        document.documentElement.setAttribute('better-slp-dark-mode', 'false'); // Disable dark mode attribute on the html tag
        return;
    }
    document.documentElement.setAttribute('better-slp-dark-mode', 'true'); // Enable dark mode attribute on the html tag
}
function appendQuickSwitcherToDOM() {
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
}
function openQuickSwitcher(toggleState) {
    const existingInstances = document.querySelectorAll('.better-slp-quick-switcher-container');
    if (!toggleState || existingInstances.length != 0) { // Check if the toggle state says the quick switcher should be closed OR if there are already existing instances of the quick switcher
        existingInstances.forEach(instance => {
            instance.remove();
        });
        return; // Terminate function
    }
    // Open quick switcher
    appendQuickSwitcherToDOM();
}
function initialize() {
    chrome.storage.sync.get('darkMode', items => {
        if (items.darkMode)
            enableDarkMode(true, false);
    });
    chrome.storage.sync.set({ darkMode: true });
    // Keyboard Shortcuts
    window.addEventListener('keydown', e => {
        switch (true) {
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
