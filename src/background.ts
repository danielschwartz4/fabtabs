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

  chrome.contextMenus.onClicked.addListener(({ selectionText, pageUrl }) => {
    if (!selectionText) {
      console.log("no text selected");
      return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.storage.local.get("data", function (data) {
        if (data === undefined) {
          data = {};
        }
        if (data[pageUrl] === undefined) {
          data[pageUrl] = {};
        }

        const linkToHighlight =
          pageUrl + "#:~:text=" + encodeURIComponent(selectionText);

        const obj: { [url: string]: { [note: string]: {} } } = { ...data };
        console.log("C");
        console.log(obj);
        obj[pageUrl][selectionText] = { posUrl: linkToHighlight };
        console.log("D");
        console.log(obj);

        chrome.storage.local.set({ data: obj }).then(() => {
          console.log("Value is set to " + obj);
        });
      });
    });
  });
};

function polling() {
  console.log("polling");
  contextMenus();
  setTimeout(polling, 1000 * 20);
}

polling();
