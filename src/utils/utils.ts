import { DataType, Highlight, NotesType } from "../types/types";

export const displayMainHighlights = (highlights: Highlight[]) => {
  // reset highlight list
  const highlightList = document.getElementById("highlight-list");
  (highlightList as HTMLElement).innerHTML = "";

  for (var h of highlights) {
    // !! Get rid of href and make it so click goes to highlight
    const newEl = document.createElement("div");
    newEl.classList.add("highlight");
    newEl.innerText = " - " + h.string;
    newEl.addEventListener("click", () => {
      console.log("clicked");
      chrome.runtime.sendMessage({ action: "show-highlight" });
    });
    highlightList?.appendChild(newEl);
  }
  return highlightList;
};

export const displayPopoverHighlights = (highlights: Highlight[]) => {
  // reset highlight list
  const highlightList = document.getElementById("popover");
  (highlightList as HTMLElement).innerHTML = "";

  for (var h of highlights) {
    // !! Get rid of href and make it so click goes to highlight
    const newEl = document.createElement("div");
    newEl.classList.add("highlight");
    newEl.innerText = " - " + h.string;
    newEl.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "show-highlight" });
    });
    highlightList?.appendChild(newEl);
  }
  return highlightList;
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

export async function getCurrentTab() {
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

async function sendMessageInTab(
  tabId: number,
  message: any,
  callback?: ((response: any) => void) | undefined
) {
  chrome.tabs.sendMessage(tabId, message, callback);
}

export async function sendMessageInCurrentTab(
  message: any,
  callback?: ((response: any) => void) | undefined
) {
  const tab = await getCurrentTab();
  if (!tab.id) return;
  return sendMessageInTab(tab.id, message, callback);
}

export async function executeInCurrentTab(opts: any) {
  const tab = await getCurrentTab();
  return executeInTab(tab.id, opts);
}
