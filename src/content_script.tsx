import { createHighlight } from "./contentScript/createHighlight";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  createHighlight();
  sendResponse({ result: "success" });
});
