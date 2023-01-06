import { sendMessageInCurrentTab } from "../utils/utils";
import { initializeBadgeEvents } from "./badgeEvents";

export function initializeTabEventListeners() {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
      initializeBadgeEvents();
      console.log("complete");
      sendMessageInCurrentTab({
        action: "tab-updated",
      });
    }
  });
}
