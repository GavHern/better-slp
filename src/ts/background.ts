function executeInjectScript(details: any){
  chrome.tabs.executeScript(details.id, { file: "bundle/ts/inject.js" });
}

// Listens for a pushstate on the summit learning platform and runs inject.ts
chrome.webNavigation.onHistoryStateUpdated.addListener(destination => {
  if(new RegExp('.*:\/\/.*?\.?summitlearning\.org/my/(assessment_takes|math_unit_assessment).*').test(destination.url)) return; // Doesn't run script if the url is for an assessment page or math unit test
	
  executeInjectScript(destination);
}, {
  "url": [{
    urlMatches: ".*://.*\\..*summitlearning\\.org.*"
  }]
});


export {}