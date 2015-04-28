tabs = {};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  tabs[tabId] = tab;
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  if(tabs[tabId] && tabs[tabId].pinned) {
    var tab = tabs[tabId];
    delete tabs[tabId];
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
