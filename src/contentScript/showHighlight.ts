export function showHighlight(highlightId: string) {
  console.log("showHighlight");
  // const highlightEl = document.querySelector(
  //   `[data-highlight-id="${highlightId}"]`
  // );
  const highlightEl = document.querySelector(
    `[data-highlight-id="c1e2fad4-e987-4369-ad74-3c8b45656cbb"]`
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
