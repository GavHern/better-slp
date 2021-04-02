"use strict";
function enableDarkMode(toggleState, animation) {
    if (animation === void 0) { animation = true; }
    if (animation) {
        document.documentElement.classList.add('better-slp-dark-mode-transitioning');
        setTimeout(function () { document.documentElement.classList.remove('better-slp-dark-mode-transitioning'); }, 300);
    }
    if (!toggleState) {
        document.documentElement.setAttribute('better-slp-dark-mode', 'false');
        return;
    }
    document.documentElement.setAttribute('better-slp-dark-mode', 'true'); // Add dark mode link
}
enableDarkMode(true, false);
