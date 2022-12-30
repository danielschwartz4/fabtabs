import { createHighlight } from "./contentScript/createHighlight";
import { loadAllHighlights } from "./contentScript/loadAllHighlights";

window.addEventListener("load", function () {
  console.log("hello");
  loadAllHighlights();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  createHighlight(request.arguments);
  sendResponse({ result: "success" });
});
