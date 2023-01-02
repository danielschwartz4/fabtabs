import { getCurrentTab, sendMessageInCurrentTab } from "../utils/utils";

export function initializeKeyboardShortcutEventListeners() {
  // Add Keyboard shortcuts
  chrome.commands.onCommand.addListener(async (command) => {
    switch (command) {
      case "execute-highlight":
        console.log("in");
        const tab = await getCurrentTab();
        sendMessageInCurrentTab(
          {
            action: "create-highlight",
            command: "append",
            arguments: tab.title,
          },
          function (response) {
            console.log("response", response);
          }
        );
    }
  });
}
