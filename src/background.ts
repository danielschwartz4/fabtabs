import { initializeBadgeEvents } from "./background/badgeEvents";
import { contextMenus } from "./background/contextMenus";
import { initializeKeyboardShortcutEventListeners } from "./background/keyboardShortcuts";
import { initializeMessageEventListeners } from "./background/messageEvents";
import { initializeTabEventListeners } from "./background/tabEvents";

function execute() {
  console.log("executing");
  // initializeBadgeEvents();
  initializeKeyboardShortcutEventListeners();
  initializeMessageEventListeners();
  initializeTabEventListeners();
  contextMenus();
  setTimeout(execute, 1000 * 20);
}

execute();
