export const displayNotes = (notes: { [note: string]: { posUrl: string } }) => {
  let tmp = "";
  for (var key in notes) {
    if (notes.hasOwnProperty(key)) {
      // Key should eventually point to comment
      // !! Right now only works if highlight entire word
      tmp += `- <a href="${notes[key]["posUrl"]}" target="_blank">${key}</a> </br> </br>`;
    }
  }
  return tmp;
};

export const processText = (selectionText: string) => {
  if (selectionText.split(" ").length > 2) {
    let lastIndex = selectionText.lastIndexOf(" ");
    const firstIndex = selectionText.indexOf(" ") + 1;
    selectionText = selectionText.substring(0, lastIndex);
    selectionText = selectionText.substring(firstIndex);
  }
  selectionText.trim();
  return selectionText;
};
