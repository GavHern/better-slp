"use strict";
var _a;
function main() {
}
if (document.querySelectorAll('#nprogress').length == 0)
    main();
(_a = document.querySelector('#nprogress')) === null || _a === void 0 ? void 0 : _a.addEventListener('DOMNodeRemoved', function () { main(); });
