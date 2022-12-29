import { highlight } from "./highlight";

export async function createHighlight(selection = window.getSelection()) {
  const selectionString = selection?.toString();
  if (!selectionString) return;

  let container = selection?.getRangeAt(0).commonAncestorContainer;

  while (container && container?.childNodes.length === 0) {
    container = container.parentNode as Node;
  }

  highlight(selectionString, container as Node, selection as Selection);
}
