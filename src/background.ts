import { contextMenus } from "./background/contextMenus";
import { initializeKeyboardShortcutEventListeners } from "./background/keyboardShortcuts";

function execute() {
  console.log("executing");
  initializeKeyboardShortcutEventListeners();
  contextMenus();
  setTimeout(execute, 1000 * 20);
}

execute();
