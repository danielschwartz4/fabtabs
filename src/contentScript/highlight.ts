import { recursiveWrapper } from "./highlightWrapper";

export function highlight(
  selString: any,
  container: Element,
  selection: Selection,
  highlightIndex: number
) {
  const highlightInfo = {
    color: "yellow",
    textColor: "inherit",
    highlightIndex: highlightIndex,
    selectionString: selString,
    anchor: selection.anchorNode as Node,
    anchorOffset: selection.anchorOffset,
    focus: selection.focusNode as Node,
    focusOffset: selection.focusOffset,
  };

  /**
   * STEPS:
   * 1 - Use the offset of the anchor/focus to find the start of the selected text in the anchor/focus element
   *     - Use the first of the anchor of the focus elements to appear
   * 2 - From there, go through the elements and find all Text Nodes until the selected text is all found.
   *     - Wrap all the text nodes (or parts of them) in a span DOM element with special highlight class name and bg color
   * 3 - Deselect text
   * 4 - Attach mouse hover event listeners to display tools when hovering a highlight
   */

  // Step 1 + 2:
  try {
    //   recursiveWrapper($(container), highlightInfo);
    recursiveWrapper(container, highlightInfo);
  } catch (e) {
    return false;
  }

  // Step 3:
  if (selection.removeAllRanges) selection.removeAllRanges();

  // Step 4:
  // const parent = $(container).parent();
  // parent.find(`.${HIGHLIGHT_CLASS}`).each((_i, el) => {
  //   initializeHighlightEventListeners(el);
  // });

  return true; // No errors
}
