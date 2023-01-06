export function highlight(
  selString: string,
  container: Element,
  selection: Selection | any,
  highlightIndex: number,
  uuid: string
) {
  const range = new Range();

  // !! only works when anchor less than focus
  console.log("ANCHOR");
  console.log(selection.anchorNode, selection.anchorOffset);
  console.log("FOCUS");
  console.log(selection.focusNode, selection.focusOffset);

  // == 4 if from left, 2 if from right
  console.log(
    selection.anchorNode.compareDocumentPosition(selection.focusNode)
  );

  const posBitMap = selection.anchorNode.compareDocumentPosition(
    selection.focusNode
  );
  console.log("posBitMap", posBitMap);
  if (posBitMap === 2 || posBitMap === 0) {
    range.setStart(selection.focusNode, selection.focusOffset);
    range.setEnd(selection.anchorNode, selection.anchorOffset);
  } else {
    range.setStart(selection.anchorNode, selection.anchorOffset);
    range.setEnd(selection.focusNode, selection.focusOffset);
  }
  console.log("RANGE: ", range);
  if (range) {
    const highlighted = document.createElement("mark");
    highlighted.classList.add("highlighter--highlighted");
    highlighted.dataset.highlightId = uuid;
    highlighted.appendChild(range.extractContents());
    console.log("highlighted", highlighted);
    console.log("children", highlighted.childNodes);
    range.insertNode(highlighted);

    //
    // console.log(range.cloneContents());
    // for (let c of range.cloneContents().childNodes) {
    //   console.log("C doc", c.ownerDocument?.DOCUMENT_FRAGMENT_NODE);
    //   const highlighted = document.createElement("mark");
    //   highlighted.classList.add("highlighter--highlighted");
    //   highlighted.dataset.highlightId = uuid;
    //   highlighted.appendChild(c);
    //   console.log("highlighted", highlighted);
    //   range.insertNode(c);
    // }
    // range.deleteContents();
  }
  return true;

  // const highlightInfo = {
  //   color: "yellow",
  //   textColor: "inherit",
  //   highlightIndex: highlightIndex,
  //   selectionString: selString,
  //   anchor: selection.anchorNode as Node,
  //   anchorOffset: selection.anchorOffset,
  //   focus: selection.focusNode as Node,
  //   focusOffset: selection.focusOffset,
  //   uuid: uuid,
  // };

  // /**
  //  * STEPS:
  //  * 1 - Use the offset of the anchor/focus to find the start of the selected text in the anchor/focus element
  //  *     - Use the first of the anchor of the focus elements to appear
  //  * 2 - From there, go through the elements and find all Text Nodes until the selected text is all found.
  //  *     - Wrap all the text nodes (or parts of them) in a span DOM element with special highlight class name and bg color
  //  * 3 - Deselect text
  //  * 4 - Attach mouse hover event listeners to display tools when hovering a highlight
  //  */

  // // Step 1 + 2:
  // try {
  //   //   recursiveWrapper($(container), highlightInfo);
  //   recursiveWrapper(container, highlightInfo);
  // } catch (e) {
  //   return false;
  // }

  // // Step 3:
  // if (selection.removeAllRanges) selection.removeAllRanges();

  // // Step 4:
  // // const parent = $(container).parent();
  // // parent.find(`.${HIGHLIGHT_CLASS}`).each((_i, el) => {
  // //   initializeHighlightEventListeners(el);
  // // });

  // return true; // No errors
}
