function executeInjectScript(details: any): void{
  chrome.tabs.executeScript(details.id,{file: "bundle/ts/inject.js"});
}

// Listens for a pushstate on the summit learning platform and runs inject.ts
chrome.webNavigation.onHistoryStateUpdated.addListener(d => {
  if(new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/(assessment_takes|math_unit_assessment).*').test(d.url)) return; // Doesn't run script if the url is for an assessment page or math unit test

  executeInjectScript(d);
}, {
  "url": [{
    urlMatches: ".*://.*\\..*summitlearning\\.org.*"
  }]
});


export {}