import { createHighlight } from "./contentScript/createHighlight";
import { loadAllHighlights } from "./contentScript/loadAllHighlights";
import { showHighlight } from "./contentScript/showHighlight";

window.addEventListener("load", function () {
  console.log("hello");
  loadAllHighlights();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.action);
  switch (request.action) {
    case "create-highlight":
      createHighlight(request.arguments);
      break;
    case "show-highlight":
      console.log("finally??");
      showHighlight("3");
      break;
  }

  sendResponse({ result: "success" });
});
