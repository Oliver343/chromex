// Track time spent on YouTube.com
var youtubeTime = 0; // Variable to store the total time spent on YouTube.com

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      if (activeTab.url.includes('youtube.com')) {
        youtubeTime += 1; // Increment the time spent by 1 second
        console.log('Time spent on YouTube: ' + youtubeTime + ' seconds');
      }
    });
  }
});