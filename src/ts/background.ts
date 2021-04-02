function executeInjectScript(details: any): void{
  chrome.tabs.executeScript(details.id,{file: "js/inject.js"});
}

// Listens for a pushstate on the summit learning platform and runs inject.ts
chrome.webNavigation.onHistoryStateUpdated.addListener(d => {
  executeInjectScript(d);
}, {
  "url": [{
    urlMatches: ".*://.*\\..*summitlearning\\.org.*"
  }]
});