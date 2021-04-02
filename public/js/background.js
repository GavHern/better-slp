"use strict";
function executeInjectScript(details) {
    chrome.tabs.executeScript(details.id, { file: "js/inject.js" });
}
// Listens for a pushstate on the summit learning platform and runs inject.ts
chrome.webNavigation.onHistoryStateUpdated.addListener(function (d) {
    executeInjectScript(d);
}, {
    "url": [{
            urlMatches: ".*://.*\\..*summitlearning\\.org.*"
        }]
});
