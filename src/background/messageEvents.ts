import { sendMessageInCurrentTab } from "../utils/utils";

// !! Delete
export function initializeMessageEventListeners() {
  // Listen to messages from content scripts
  /* eslint-disable consistent-return */
  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (!request.action) return;
    switch (request.action) {
      case "show-highlight":
        console.log("in background");
        sendMessageInCurrentTab({
          action: "show-highlight",
          command: "append",
        });
    }
  });
}
