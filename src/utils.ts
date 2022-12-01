export const displayNotes = (notes: { [note: string]: { posUrl: string } }) => {
  let tmp = "";
  for (var key in notes) {
    if (notes.hasOwnProperty(key)) {
      // Key should eventually point to comment
      // tmp += `<a href="${notes[key]["posUrl"]}">${key}</a>`;
      tmp += `<a href="${notes[key]["posUrl"]}" target="_blank">${key}</a>`;
    }
  }
  return tmp;
};
