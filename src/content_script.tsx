import { createHighlight } from "./contentScript/createHighlight";
import { loadAllHighlights } from "./contentScript/loadAllHighlights";
import { showHighlight } from "./contentScript/showHighlight";
import { extractUUID } from "./utils/utils";

window.addEventListener("load", async function () {
  loadAllHighlights();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case "create-highlight":
      console.log("in create highlight");
      createHighlight(request.arguments["title"], request.arguments["favicon"]);
      break;
    case "show-highlight":
      showHighlight(request.arguments);
      break;
    case "tab-updated":
      const uuid = extractUUID(location.href);
      if (uuid) {
        showHighlight(uuid);
      }
      break;
  }

  sendResponse({ result: "success" });
});
