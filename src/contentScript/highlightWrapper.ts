export function recursiveWrapper(container: Element, highlightInfo: any) {
  return _recursiveWrapper(container, highlightInfo, false, 0); // Initialize the values of 'startFound' and 'charsHighlighted'
}

function _recursiveWrapper(
  container: Element,
  highlightInfo: any,
  startFound: boolean,
  charsHighlighted: number
): any {
  const {
    anchor,
    focus,
    anchorOffset,
    focusOffset,
    color,
    textColor,
    highlightIndex,
    selectionString,
    uuid,
  } = highlightInfo;
  const selectionLength = selectionString.length;

  container.childNodes?.forEach((node: Node, idx: number) => {
    // !! DOESN"T HIGHLIGHT DIFFERENT NODES

    if (charsHighlighted >= selectionLength) return; // Stop early if we are done highlighting

    if (node.nodeType !== Node.TEXT_NODE) {
      if (getComputedStyle(node as Element).visibility) {
        [startFound, charsHighlighted] = _recursiveWrapper(
          node as Element,
          highlightInfo,
          startFound,
          charsHighlighted
        );
      }
      return;
    }

    // Step 1:
    // The first element to appear could be the anchor OR the focus node,
    // since you can highlight from left to right or right to left

    let startIndex = 0;
    if (!startFound) {
      if (anchor != node && focus != node) return; // If the element is not the anchor or focus, continue

      startFound = true;
      startIndex = Math.min(
        ...[
          ...(node == anchor ? [anchorOffset] : []),
          ...(node == focus ? [focusOffset] : []),
        ]
      );
    }

    // Step 2:
    // If we get here, we are in a text node, the start was found and we are not done highlighting
    // const { nodeValue, parentElement: parent } = node;
    const nodeValue = node.nodeValue;
    // const nodeValue = node.textContent;
    const parent = node.parentElement;

    if (nodeValue && startIndex > nodeValue.length) {
      // Start index is beyond the length of the text node, can't find the highlight
      // NOTE: we allow the start index to be equal to the length of the text node here just in case
      throw new Error(
        `No match found for highlight string '${selectionString}'`
      );
    }
    // Split the text content into three parts, the part before the highlight, the highlight and the part after the highlight:

    // !! This is the problem it's fucking everything up
    const highlightTextEl = (node as Text).splitText(startIndex);

    // Instead of simply blindly highlighting the text by counting characters,
    // we check if the text is the same as the selection string.
    let i = startIndex;
    if (nodeValue) {
      for (; i < nodeValue?.length; i++) {
        // Skip any whitespace characters in the selection string as there can
        // be more than in the text node:
        while (
          charsHighlighted < selectionLength &&
          selectionString[charsHighlighted].match(/\s/u)
        )
          charsHighlighted++;
        if (charsHighlighted >= selectionLength) break;

        const char = nodeValue[i];
        if (char === selectionString[charsHighlighted]) {
          charsHighlighted++;
        } else if (!char.match(/\s/u)) {
          console.log("IN ERROR");
          throw new Error(
            `No match found for highlight string '${selectionString}'`
          );
        }
      }
    }

    // If textElement is wrapped in a .highlighter--highlighted span, do not add this highlight
    // as it is already highlighted, but still count the number of charsHighlighted
    if (parent?.classList.contains("highlighter--highlighted")) return;

    const elementCharCount = i - startIndex; // Number of chars to highlight in this particular element
    const insertBeforeElement = highlightTextEl.splitText(elementCharCount);
    // const insertBeforeElement = Object.values(container.childNodes)[idx+1];
    const highlightText = highlightTextEl.nodeValue;
    // const highlightText = Object.values(container.childNodes)[idx + 1].nodeValue

    if (highlightText && highlightText.match(/^\s*$/u)) {
      parent?.normalize(); // Undo any 'splitText' operations
      return;
    }

    // If we get here, highlight!
    // Wrap the highlighted text in a span with the highlight class name
    const highlightNode = document.createElement("span");
    highlightNode.classList.add(
      color === "inherit" ? "highlighter--deleted" : "highlighter--highlighted"
    );
    highlightNode.style.backgroundColor = "yellow";
    highlightNode.style.color = textColor;
    // highlightNode.dataset.highlightId = highlightIndex;
    highlightNode.dataset.highlightId = uuid;
    highlightNode.textContent = highlightTextEl.nodeValue;
    highlightTextEl.remove();
    parent?.insertBefore(highlightNode, insertBeforeElement);
  });

  return [startFound, charsHighlighted];
}
