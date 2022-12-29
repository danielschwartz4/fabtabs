import { store } from "../utils/storage";
import { highlight } from "./highlight";

export async function createHighlight(selection = window.getSelection()) {
  const selectionString = selection?.toString();
  if (!selectionString) return;

  let container = selection?.getRangeAt(0).commonAncestorContainer;

  while (container && container?.childNodes.length === 0) {
    container = container.parentNode as Node;
  }
  const highlightIndex = await store(
    selection as Selection,
    container as Element,
    location.hostname + location.pathname,
    location.href
  );
  console.log("highlightIndex", highlightIndex);
  highlight(
    selectionString,
    container as Element,
    selection as Selection,
    highlightIndex
  );
}
