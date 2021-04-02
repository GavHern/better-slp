"use strict";
function executeInjectScript(details) {
    chrome.tabs.executeScript(details.id, { file: "js/inject.js" });
}
chrome.webNavigation.onHistoryStateUpdated.addListener(function (d) {
    executeInjectScript(d);
}, {
    "url": [{
            urlMatches: ".*://.*\\..*summitlearning\\.org.*"
        }]
});
