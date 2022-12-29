import { contextMenus } from "./background/contextMenus";
import { initializeKeyboardShortcutEventListeners } from "./background/keyboardShortcuts";
import { initializeTabEventListeners } from "./background/loadAllHighlights";

function execute() {
  console.log("executing");
  initializeKeyboardShortcutEventListeners();
  initializeTabEventListeners();
  contextMenus();
  setTimeout(execute, 1000 * 20);
}

execute();
