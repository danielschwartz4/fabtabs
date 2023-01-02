import { createHighlight } from "./contentScript/createHighlight";
import { loadAllHighlights } from "./contentScript/loadAllHighlights";
import { showHighlight } from "./contentScript/showHighlight";

window.addEventListener("load", function () {
  loadAllHighlights();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case "create-highlight":
      console.log("in create highlight");
      createHighlight(request.arguments);
      break;
    case "show-highlight":
      showHighlight(request.arguments);
      break;
  }

  sendResponse({ result: "success" });
});
