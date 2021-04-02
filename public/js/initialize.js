"use strict";
function enableDarkMode(toggleState, animation) {
    if (animation === void 0) { animation = true; }
    if (animation) {
        document.documentElement.classList.add('better-slp-dark-mode-transitioning');
        setTimeout(function () { document.documentElement.classList.remove('better-slp-dark-mode-transitioning'); }, 300);
    }
    if (!toggleState) {
        document.documentElement.classList.remove('better-slp-dark-mode-container');
        return;
    }
    document.documentElement.classList.add('better-slp-dark-mode-container'); // Add dark mode link
}
enableDarkMode(true, false);
