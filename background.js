chrome.tabs.onUpdated.addListener(function(tabId, info) {
  chrome.tabs.executeScript(null,{file:"lib/jquery.js"});
  chrome.tabs.executeScript(null,{file:"lib/summernote.js"});
  chrome.tabs.executeScript(null,{file:"inject.js"});
  chrome.tabs.executeScript(null,{file:"summernote-opt.js"});
});