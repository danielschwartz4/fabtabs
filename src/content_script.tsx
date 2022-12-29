import { createHighlight } from "./contentScript/createHighlight";
import { loadAllHighlights } from "./contentScript/loadAllHighlights";

window.addEventListener("load", function () {
  // Your content script code here
  loadAllHighlights();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("in content script");
  createHighlight();
  sendResponse({ result: "success" });
});
