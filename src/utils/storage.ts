import { getQuery } from "./storageUtils";

let alternativeUrlIndexOffset = 0; // Number of elements stored in the alternativeUrl Key. Used to map highlight indices to correct key

export async function store(
  selection: Selection,
  container: Element,
  url: string,
  href: string,
  color = "yellow",
  textColor = "inherit"
) {
  const { highlights } = await chrome.storage.local.get({ highlights: {} });
  console.log("highlights", highlights);

  if (!highlights[url]) highlights[url] = [];

  const count = highlights[url].push({
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
  });
  chrome.storage.local.set({ highlights });

  // Return the index of the new highlight:
  return count - 1 + alternativeUrlIndexOffset;
}
