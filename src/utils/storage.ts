import { highlight } from "../contentScript/highlight";
import { Highlight } from "../types/types";
import { elementFromQuery, getQuery } from "./storageUtils";

let alternativeUrlIndexOffset = 0; // Number of elements stored in the alternativeUrl Key. Used to map highlight indices to correct key

export async function store(
  selection: Selection,
  container: Element,
  url: string,
  href: string,
  title: string,
  color = "yellow",
  textColor = "inherit"
) {
  const { tabs } = await chrome.storage.local.get({ tabs: {} });
  console.log("tabs", tabs);

  // if (!tabs[url]) tabs[url] = [];
  console.log("before");

  if (!tabs[url]) {
    console.log("here");
    tabs[url] = { highlights: [], title: title };
  }

  const obj: Highlight = {
    string: selection.toString(),
    container: getQuery(container),
    anchorNode: getQuery(selection.anchorNode as Element),
    anchorOffset: selection.anchorOffset,
    focusNode: getQuery(selection.focusNode as Element),
    focusOffset: selection.focusOffset,
    color,
    textColor,
    href,
    uuid: crypto.randomUUID(),
    createdAt: Date.now(),
  };

  const count = tabs[url]["highlights"].push(obj);
  chrome.storage.local.set({ tabs });

  // Return the index of the new highlight:
  return count - 1 + alternativeUrlIndexOffset;
}

export async function loadAll(url: string, alternativeUrl?: string) {
  const result = await chrome.storage.local.get({ tabs: {} });
  let highlights: Highlight[] = [];
  // console.log(alternativeUrl);
  // console.log("result.tabs", result.tabs[alternativeUrl]["highlights"]);

  // Because of a bug in an older version of the code, some tabs were stored
  // using a key that didn't correspond to the full page URL. To fix this, if the
  // alternativeUrl exists, try to load tabs from there as well
  if (alternativeUrl) {
    highlights = highlights.concat(
      result.tabs[alternativeUrl]["highlights"] || []
    );
  }
  alternativeUrlIndexOffset = highlights.length;

  highlights = highlights.concat(result.tabs[url]["highlights"] || []);

  if (!highlights) return;

  for (let i = 0; i < highlights.length; i++) {
    load(highlights[i], i);
  }
}

export function load(highlightVal: Highlight, highlightIndex: number) {
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
    highlightIndex
  );

  return success;
}
