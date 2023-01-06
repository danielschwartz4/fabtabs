import { getCurrentTab, trimUrl } from "../utils/utils";

export const initializeBadgeEvents = async () => {
  console.log("here");
  const tab = await getCurrentTab();
  if (!tab.url) return;

  const url = trimUrl(tab.url as string);

  chrome.storage.local.get(function (data) {
    const display = data["tabs"][url]["highlights"].length;
    chrome.action.setBadgeText({ text: display.toString(), tabId: tab.id });
    chrome.action.setBadgeBackgroundColor({
      color: "#153EEA",
      tabId: tab.id,
    });
  });
};
