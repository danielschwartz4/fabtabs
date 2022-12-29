import { createHighlight } from "./contentScript/createHighlight";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("in content script");
  createHighlight();
  sendResponse({ result: "success" });
});
