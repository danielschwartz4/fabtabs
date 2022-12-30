export function showHighlight(highlightId: string) {
  console.log("showHighlight");
  console.log(highlightId);
  const highlightEl = document.querySelector(
    `[data-highlight-id="${highlightId}"]`
  );

  highlightEl?.scrollIntoView();
}
