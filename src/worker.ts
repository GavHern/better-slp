chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      message: "routerUpdate",
      url: changeInfo.url,
    });
  }
});
