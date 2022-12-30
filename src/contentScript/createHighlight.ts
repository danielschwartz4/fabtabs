import { store } from "../utils/storage";
import { highlight } from "./highlight";

export async function createHighlight(
  title: string,
  selection = window.getSelection()
) {
  const selectionString = selection?.toString();
  if (!selectionString) return;

  let container = selection?.getRangeAt(0).commonAncestorContainer as Element;

  while (container && container?.childNodes.length === 0) {
    container = container.parentNode as Element;
  }

  const [highlightIndex, uuid] = await store(
    selection as Selection,
    container,
    location.hostname + location.pathname,
    location.href,
    title
  );
  console.log("highlightIndex", highlightIndex);
  highlight(
    selectionString,
    container as Element,
    selection as Selection,
    highlightIndex,
    uuid
  );
}
