"use strict";
var _a;
function enableDarkMode(toggleState) {
    if (!toggleState) {
        document.body.classList.remove('better-slp-dark-mode-container');
    }
    document.body.classList.add('better-slp-dark-mode-container'); // Add dark mode link
}
function main() {
    enableDarkMode(true);
}
(_a = document.querySelector('#nprogress')) === null || _a === void 0 ? void 0 : _a.addEventListener('DOMNodeRemoved', function () { main(); });
main();
