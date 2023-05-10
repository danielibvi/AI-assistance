{chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "generateAvatar") {
    fetch("https://thispersondoesnotexist.com/image", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
      }
    })
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      sendResponse({ avatarUrl: url });
    })
    .catch(error => console.log(error));
    return true;
  }
});
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'aia.com' },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
