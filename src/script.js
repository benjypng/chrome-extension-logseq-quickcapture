const main = async () => {
  const getCurrentTab = async () => {
    let [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    return tab;
  };

  const buildURL = async () => {
    const { page } = await chrome.storage.sync.get("page");
    const { append } = await chrome.storage.sync.get("append");
    const tab = await getCurrentTab();

    // chrome.scripting.executeScript is different from Firefox
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["src/result.js"],
    });

    let url;
    if (page === "cursor") {
      url = `logseq://x-callback-url/quickCapture?page=""&append=false&title=${encodeURIComponent(
        tab.title,
      )}&content=${encodeURIComponent(result ? result : "")}&url=${encodeURIComponent(tab.url)}`;
    } else {
      url = `logseq://x-callback-url/quickCapture?page=${page}&append=${append}&title=${encodeURIComponent(
        tab.title,
      )}&content=${encodeURIComponent(result ? result : "")}&url=${encodeURIComponent(tab.url)}`;
    }
    return url;
  };

  const url = await buildURL();
  const tab = await chrome.tabs.create({
    active: true,
    url,
  });
  setTimeout(async () => {
    await chrome.tabs.remove(tab.id);
  }, 1000);
};

main();
