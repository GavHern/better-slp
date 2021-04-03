"use strict";
function executeInjectScript(details) {
    chrome.tabs.executeScript(details.id, { file: "js/inject.js" });
}
// Listens for a pushstate on the summit learning platform and runs inject.ts
chrome.webNavigation.onHistoryStateUpdated.addListener(d => {
    if (new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/assessment_takes.*').test(d.url))
        return; // Doesn't run script if the url is for an assessment page
    executeInjectScript(d);
}, {
    "url": [{
            urlMatches: ".*://.*\\..*summitlearning\\.org.*"
        }]
});
