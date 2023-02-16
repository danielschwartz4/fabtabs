import { getCurrentTab, sendMessageInCurrentTab } from "../utils/utils";

export function initializeKeyboardShortcutEventListeners() {
  // Add Keyboard shortcuts
  chrome.commands.onCommand.addListener(async (command) => {
    console.log("COMMAND");

    switch (command) {
      case "execute-highlight":
        console.log("in");
        const tab = await getCurrentTab();
        // setTimeout(() => {}, 1000);
        console.log("AFTER");
        sendMessageInCurrentTab(
          {
            action: "create-highlight",
            command: "append",
            arguments: { title: tab.title, favicon: tab.favIconUrl },
          },
          function (response) {
            console.log("response", response);
          }
        );
    }
  });
}
