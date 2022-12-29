import { loadAll } from "../utils/storage";
import { executeInTab } from "../utils/utils";

export function initializeTabEventListeners() {
  // If the URL changes, try again to highlight
  // This is done to support javascript Single-page applications
  // which often change the URL without reloading the page
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, _tab) => {
    setTimeout(() => {}, 1000);
    if (changeInfo.url) {
      console.log("inini");
      executeInTab(tabId, { func: loadAll });
    }
  });
}

// function loadPageHighlights(tabId: string) {
//   function contentScriptLoadPageHighlights() {
//     // It happens frequently that we get here before all content scripts have been loaded.
//     // This is because of the background script event 'tab.onUpdated' that is fired when
//     // the user navigates to a different document. In this scenario, this content script
//     // is executed before the content scripts from the manifest file have been loaded.
//     // Furthermore, the 'DOMContentLoaded' event is fired before the content scripts are loaded.
//     // This is not an issue because this content script is also loaded by default on every
//     // page through the manifest configuration.
//     if (typeof window.highlighterAPI?.highlights?.loadAll === "function") {
//       window.highlighterAPI.highlights.loadAll();
//     }
//   }

//   executeInTab(tabId, { func: loadAll });
// }
