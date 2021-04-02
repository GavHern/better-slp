"use strict";
var _a;
function main() {
    // Main code to execute
}
if (document.querySelectorAll('#nprogress').length == 0)
    main(); // Initial load
(_a = document.querySelector('#nprogress')) === null || _a === void 0 ? void 0 : _a.addEventListener('DOMNodeRemoved', function () { main(); }); // Reload every pushstate
