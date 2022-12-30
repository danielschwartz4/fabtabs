import { DataType, Highlight, NotesType } from "../types/types";

// export const displayNotes = (notes: { [note: string]: { posUrl: string } }) => {
//   let tmp = "";

//   for (var key in notes) {
//     if (notes.hasOwnProperty(key)) {
//       // Key should eventually point to comment
//       tmp += `<div>- <a href="${notes[key]["posUrl"]}" target="_blank">${key}</a> </br> </br></div>`;
//     }
//   }
//   return tmp;
// };

export const displayNotes = (highlights: Highlight[]) => {
  let tmp = "";

  for (var h of highlights) {
    // !! Get rid of href and make it so click goes to highlight
    tmp += `<div>- <a href="${h.href}" target="_blank">${h.string}</a> </br> </br></div>`;
  }
  return tmp;
};

export const removeUrl = (data: DataType, url: string) => {
  delete data[url];
  return data;
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

async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export async function executeInTab(tabId: any, { file, func, args }: any) {
  const executions = await chrome.scripting.executeScript({
    target: { tabId, allFrames: true },
    ...(file && { files: [file] }),
    func,
    args,
  });

  if (executions.length == 1) {
    return executions[0].result;
  }

  // If there are many frames, concatenate the results
  return executions.flatMap((execution) => execution.result);
}

export async function executeInCurrentTab(opts: any) {
  const tab = await getCurrentTab();
  return executeInTab(tab.id, opts);
}
