"use strict";
function executeInjectScript(details) {
    chrome.tabs.executeScript(details.id, { file: "js/inject.js" });
}
chrome.webNavigation.onHistoryStateUpdated.addListener(d => {
    if (new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/(assessment_takes|math_unit_assessment).*').test(d.url))
        return;
    executeInjectScript(d);
}, {
    "url": [{
            urlMatches: ".*://.*\\..*summitlearning\\.org.*"
        }]
});
