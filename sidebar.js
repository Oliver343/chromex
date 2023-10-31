window.addEventListener('DOMContentLoaded', function () {
  // Update the YouTube time in the sidebar
  chrome.extension.getBackgroundPage().setInterval(function () {
    var youtubeTime = chrome.extension.getBackgroundPage().youtubeTime;
    document.getElementById('youtubeTime').textContent = youtubeTime + ' seconds';
  }, 1000);
});