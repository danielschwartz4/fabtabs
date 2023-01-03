export function showHighlight(highlightId: string) {
  console.log("highlightId", highlightId);
  console.log(`[data-highlight-id="${highlightId}"]`);
  setTimeout(() => {}, 2000);
  console.log(document.readyState);
  const highlightEl = document.querySelector(
    `[data-highlight-id="${highlightId}"]`
  );

  console.log(highlightEl);
  highlightEl?.scrollIntoView();
}
