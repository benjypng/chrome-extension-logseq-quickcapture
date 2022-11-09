(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => getSelection().toString(),
  });

  window.open(
    `logseq://x-callback-url/quickCapture?url=${tab.url}&title=${
      tab.title
    }&content=${result ? result : ""}`
  );
})();
