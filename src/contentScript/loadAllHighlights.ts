import { loadAll } from "../utils/storage";

export function loadAllHighlights() {
  function loadAllHighlightsOnPage() {
    loadAll(
      window.location.hostname + window.location.pathname,
      window.location.pathname
    );
  }
  console.log("A");

  if (document.readyState === "loading") {
    console.log("B");
    document.removeEventListener("DOMContentLoaded", loadAllHighlightsOnPage); // Prevent duplicates
    document.addEventListener("DOMContentLoaded", loadAllHighlightsOnPage);
  } else {
    console.log("C");
    // Run immediately if the page is already loaded
    loadAllHighlightsOnPage();
  }
}
