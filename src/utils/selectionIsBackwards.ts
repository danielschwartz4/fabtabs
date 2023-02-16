export function isSelectionBackwards(selection: any) {
  var backwards = false;
  const range = new Range();
  range.setStart(selection.anchorNode, selection.anchorOffset);
  range.setEnd(selection.focusNode, selection.focusOffset);
  backwards = range.collapsed;
  range.detach();

  return backwards;
}
