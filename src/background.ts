const contextMenus = () => {
  chrome.runtime.onInstalled.addListener(async () => {
    // remove existing menu items
    chrome.contextMenus.removeAll();

    chrome.contextMenus.create({
      title: "Bookmark",
      id: "bookmark",
      contexts: ["selection"],
    });
    chrome.contextMenus.create({ title: "Toggle Cursor", id: "toggle-cursor" });
  });

  chrome.contextMenus.onClicked.addListener(({ selectionText }) => {
    chrome.storage.local.set({ text: selectionText }).then(() => {
      console.log("Value is set to " + selectionText);
    });
  });
};

function polling() {
  console.log("polling");
  contextMenus();
  setTimeout(polling, 1000 * 20);
}

polling();
