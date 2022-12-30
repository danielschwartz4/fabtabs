import { contextMenus } from "./background/contextMenus";
import { initializeKeyboardShortcutEventListeners } from "./background/keyboardShortcuts";
import { initializeTabEventListeners } from "./background/loadAllHighlights";
import { initializeMessageEventListeners } from "./background/messageEvents";

function execute() {
  console.log("executing");
  initializeKeyboardShortcutEventListeners();
  initializeMessageEventListeners();
  initializeTabEventListeners();
  contextMenus();
  setTimeout(execute, 1000 * 20);
}

execute();
