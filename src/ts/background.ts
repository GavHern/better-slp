function executeInjectScript(details: any): void{
  chrome.tabs.executeScript(details.id,{file: "js/inject.js"});
}

chrome.webNavigation.onHistoryStateUpdated.addListener(d => {
  executeInjectScript(d);
}, {
  "url": [{
    urlMatches: ".*://.*\\..*summitlearning\\.org.*"
  }]
});