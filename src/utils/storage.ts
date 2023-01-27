import { highlight } from "../contentScript/highlight";
import { Highlight } from "../types/types";
import { elementFromQuery, getQuery } from "./storageUtils";
import { getCurrentTab } from "./utils";

let alternativeUrlIndexOffset = 0; // Number of elements stored in the alternativeUrl Key. Used to map highlight indices to correct key

export async function store(
  selection: Selection,
  container: Element,
  url: string,
  href: string,
  title: string,
  favicon: string,
  color = "yellow",
  textColor = "inherit"
): Promise<[number, string]> {
  const { tabs } = await chrome.storage.local.get({ tabs: {} });

  if (!tabs[url]) {
    tabs[url] = { highlights: [], title: title, favicon: favicon };
  }

  const uuid = crypto.randomUUID();

  const obj: Highlight = {
    string: selection.toString(),
    container: getQuery(container),
    anchorNode: getQuery(selection.anchorNode as Element),
    anchorOffset: selection.anchorOffset,
    focusNode: getQuery(selection.focusNode as Element),
    focusOffset: selection.focusOffset,
    color,
    comment: "",
    textColor,
    href,
    uuid: uuid,
    createdAt: Date.now(),
  };

  const count = tabs[url]["highlights"].push(obj);
  chrome.storage.local.set({ tabs });

  // Return the index of the new highlight:
  return [count - 1 + alternativeUrlIndexOffset, uuid];
}

export async function loadAll(
  url: string
  // alternativeUrl?: string
) {
  const result = await chrome.storage.local.get({ tabs: {} });
  let highlights: Highlight[] = [];

  // Because of a bug in an older version of the code, some tabs were stored
  // using a key that didn't correspond to the full page URL. To fix this, if the
  // alternativeUrl exists, try to load tabs from there as well
  // if (alternativeUrl) {
  //   highlights = highlights.concat(
  //     result.tabs[alternativeUrl]["highlights"] || []
  //   );
  // }
  console.log(result);

  if (!result.tabs[url]) {
    return;
  }

  alternativeUrlIndexOffset = highlights.length;

  highlights = highlights.concat(result.tabs[url]["highlights"]);

  if (!highlights) return;

  for (let i = 0; i < highlights.length; i++) {
    load(highlights[i], i, url, highlights[i].comment);
  }
}

export function load(
  highlightVal: Highlight,
  highlightIndex: number,
  url: string,
  comment: string
) {
  // !! Fix this
  const selection = {
    anchorNode: elementFromQuery(highlightVal.anchorNode) as Node,
    anchorOffset: highlightVal.anchorOffset,
    focusNode: elementFromQuery(highlightVal.focusNode) as Node,
    focusOffset: highlightVal.focusOffset,
  };

  const { string: selectionString } = highlightVal;
  const container = elementFromQuery(highlightVal.container) as Element;

  const success = highlight(
    selectionString,
    container,
    selection,
    highlightIndex,
    highlightVal.uuid,
    url,
    comment
  );

  return success;
}
