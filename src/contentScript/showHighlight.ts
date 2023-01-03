export function showHighlight(highlightId: string) {
  setTimeout(() => {}, 2000);
  const highlightEl = document.querySelector(
    `[data-highlight-id="${highlightId}"]`
  );
  highlightEl?.scrollIntoView();
}
