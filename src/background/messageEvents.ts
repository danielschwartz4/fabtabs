import { sendMessageInCurrentTab } from "../utils/utils";

export function initializeMessageEventListeners() {
  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (!request.action) return;
    switch (request.action) {
      case "show-highlight":
        sendMessageInCurrentTab({
          action: "show-highlight",
        });
    }
  });
}
