export function getQuery(element: Element): string {
  if (element.id) return `#${escapeCSSString(element.id)}`;
  if (element.localName === "html") return "html";

  const parent = element.parentNode;

  if (!parent) {
    return "";
  }

  const parentSelector = getQuery(parent as Element);
  // The element is a text node
  if (!element.localName) {
    // Find the index of the text node:
    const index = Array.prototype.indexOf.call(parent?.childNodes, element);
    return `${parentSelector}>textNode:nth-of-type(${index})`;
  } else {
    const index =
      Array.from(parent.children)
        .filter((child) => child.localName === element.localName)
        .indexOf(element) + 1;
    return `${parentSelector}>${element.localName}:nth-of-type(${index})`;
  }
}

// Colons and spaces are accepted in IDs in HTML but not in CSS syntax
// Similar (but much more simplified) to the CSS.escape() working draft
function escapeCSSString(cssString: string) {
  return cssString.replace(/(:)/gu, "\\$1");
}
