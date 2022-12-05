import { DataType } from "./types/types";
import { processText } from "./utils";

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
    selectionText = processText(selectionText);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.storage.local.get("data", function (data) {
        if (data === undefined) {
          data = {};
        }
        if (pageUrl.includes("#")) {
          pageUrl = pageUrl.substring(0, pageUrl.indexOf("#"));
        }

        const linkToHighlight =
          pageUrl + "#:~:text=" + encodeURIComponent(selectionText as string);

        const obj: DataType = {
          ...data["data"],
        };

        if (obj[pageUrl] === undefined) {
          obj[pageUrl] = { notes: {}, title: tabs[0].title as string };
        }
        if (selectionText && selectionText.split(" ").length > 30) {
          const index = selectionText.indexOf(" ") + 240;
          selectionText = selectionText.substring(0, index) + "...";
        }
        obj[pageUrl]["notes"][selectionText as string] = {
          posUrl: linkToHighlight,
        };

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
