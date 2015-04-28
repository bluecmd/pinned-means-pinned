tabs = {};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  tabs[tabId] = tab;
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  // Only allow closing if the window is closing down
  if (removeInfo.isWindowClosing) {
    return;
  }

  // Otherwise, re-open the tab if it's pinned
  if (tabs[tabId] && tabs[tabId].pinned) {
    var tab = tabs[tabId];
    delete tabs[tabId];
    // Chrome doesn't allow us from stopping a removal AFAIK, so just re-open
    // the tab in the same place as a pinned tab
    chrome.tabs.create({
      pinned: true,
      url: tab.url,
      active: true,
      index: tab.index
    }, function(newTab) {
      tabs[newTab.id] = newTab;
    });
  }
});
