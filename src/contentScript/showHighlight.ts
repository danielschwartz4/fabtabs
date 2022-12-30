export function showHighlight(highlightId: string) {
  const highlightEl = document.querySelector(
    `[data-highlight-id="${highlightId}"]`
  );

  highlightEl?.scrollIntoView();
}
