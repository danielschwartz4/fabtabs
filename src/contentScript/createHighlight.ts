import { store } from "../utils/storage";
import { highlight } from "./highlight";

export async function createHighlight(
  title: string,
  favicon: string,
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
    title,
    favicon
  );

  // !! Doesn't load back on some pages, change what we store
  // const range = selection?.getRangeAt(0);

  // if (range) {
  //   const highlighted = document.createElement("mark");
  //   highlighted.classList.add("highlighter--highlighted");
  //   highlighted.dataset.highlightId = uuid;
  //   highlighted.appendChild(range.extractContents());
  //   console.log("highlighted", highlighted);
  //   range.insertNode(highlighted);
  // }

  highlight(
    selectionString,
    container as Element,
    selection as Selection,
    highlightIndex,
    uuid
  );
}
