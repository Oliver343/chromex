var youtubeTime = 0;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      if (activeTab.url.includes('youtube.com')) {
        youtubeTime += 1;
        console.log('Time spent on YouTube: ' + youtubeTime + ' seconds');

        // Send the time data to the popup or sidebar script
        chrome.runtime.sendMessage({ timeSpent: youtubeTime });
      }
    });
  }
});