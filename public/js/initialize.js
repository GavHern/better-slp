"use strict";
function enableDarkMode(toggleState, animation) {
    if (animation === void 0) { animation = true; }
    if (animation) { // Apply a css animation if needed
        document.documentElement.classList.add('better-slp-dark-mode-transitioning');
        setTimeout(function () { document.documentElement.classList.remove('better-slp-dark-mode-transitioning'); }, 300);
    }
    if (!toggleState) {
        document.documentElement.setAttribute('better-slp-dark-mode', 'false'); // Disable dark mode attribute on the html tag
        return;
    }
    document.documentElement.setAttribute('better-slp-dark-mode', 'true'); // Enable dark mode attribute on the html tag
}
enableDarkMode(true, false);
