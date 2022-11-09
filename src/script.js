chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
  let title = tabs[0].title;
  window.open(
    `logseq://x-callback-url/quickCapture?url=${url}/&title=${title}`
  );
});
