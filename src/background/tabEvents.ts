import { sendMessageInCurrentTab } from "../utils/utils";

export function initializeTabEventListeners() {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
      console.log("complete");
      sendMessageInCurrentTab({
        action: "tab-updated",
      });
    }
  });
}
