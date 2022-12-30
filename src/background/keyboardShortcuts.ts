import { sendMessageInCurrentTab } from "../utils/utils";

export function initializeKeyboardShortcutEventListeners() {
  // Add Keyboard shortcuts
  chrome.commands.onCommand.addListener((command) => {
    switch (command) {
      case "execute-highlight":
        console.log("in");
        // chrome.tabs.query(
        //   { active: true, currentWindow: true },
        //   function (tabs) {
        //     if (!tabs[0].id) {
        //       return;
        //     }
        //     setTimeout(() => {}, 1000);
        //     chrome.tabs.sendMessage(
        //       tabs[0].id,
        //       {
        //         action: "create-highlight",
        //         command: "append",
        //         arguments: tabs[0].title,
        //       },
        //       function (response) {
        //         console.log("response", response);
        //       }
        //     );
        //   }
        // );
        sendMessageInCurrentTab(
          {
            action: "create-highlight",
            command: "append",
          },
          function (response) {
            console.log("response", response);
          }
        );
    }
  });
}
