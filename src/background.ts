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
    if (selectionText.split(" ").length > 2) {
      let lastIndex = selectionText.lastIndexOf(" ");
      const firstIndex = selectionText.indexOf(" ") + 1;
      selectionText = selectionText.substring(0, lastIndex);
      selectionText = selectionText.substring(firstIndex);
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.storage.local.get("data", function (data) {
        if (data === undefined) {
          data = {};
        }

        const linkToHighlight =
          pageUrl + "#:~:text=" + encodeURIComponent(selectionText as string);

        const obj: { [url: string]: { [note: string]: {} } } = {
          ...data["data"],
        };

        if (obj[pageUrl] === undefined) {
          obj[pageUrl] = {};
        }
        obj[pageUrl][selectionText as string] = { posUrl: linkToHighlight };

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
