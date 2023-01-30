chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url?.includes("summitlearning.org")) {
    chrome.tabs.get(tabId, (tab) => {
      if (tab) {
        chrome.tabs.sendMessage(tabId, {
          message: "routerUpdate",
          url: changeInfo.url,
          status: changeInfo.status,
        });
      }
    });
  }
});
