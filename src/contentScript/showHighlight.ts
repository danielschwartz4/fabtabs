export function showHighlight(highlightId: string) {
  console.log("showHighlight");
  console.log(highlightId);
  const highlightEl = document.querySelector(
    `[data-highlight-id="${highlightId}"]`
  );

  highlightEl?.scrollIntoView();

  // if (highlightEl) {
  //   highlightEl.scrollIntoViewIfNeeded(true);
  //   const boundingRect = highlightEl.getBoundingClientRect();
  //   // TODO: Move some of this logic to hoverTools:
  //   onHighlightMouseEnterOrClick({
  //     type: "click",
  //     target: highlightEl,
  //     clientX: boundingRect.left + boundingRect.width / 2,
  //   });
  // }
}
