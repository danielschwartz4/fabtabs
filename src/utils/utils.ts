import { DataType, Highlight } from "../types/types";

export const displayMainHighlights = (highlights: Highlight[]) => {
  const highlightList = document.getElementById("highlight-list");
  (highlightList as HTMLElement).innerHTML = "";
  for (var h of highlights) {
    const newEl = document.createElement("div");
    newEl.classList.add("highlight");
    newEl.innerText = " - " + h.string;
    newEl.style.cursor = "pointer";

    // Create a new function that takes the uuid as an argument
    const showHighlight = (uuid: string) => {
      chrome.runtime.sendMessage({
        action: "show-highlight",
        arguments: uuid,
      });
    };

    // Use a closure to create a new function for each highlight element
    newEl.addEventListener(
      "click",
      (() => {
        const uuid = h.uuid;
        return () => showHighlight(uuid);
      })()
    );
    highlightList?.appendChild(newEl);
  }
};

export const displayPopoverHighlights = (highlights: Highlight[]) => {
  // reset highlight list
  const highlightList = document.getElementById("popover");
  (highlightList as HTMLElement).innerHTML = "";

  for (var h of highlights) {
    const newEl = document.createElement("div");
    newEl.style.margin = "8px";
    newEl.style.borderRadius = "4px";
    newEl.classList.add("highlight");
    newEl.innerText = " - " + h.string;
    newEl.addEventListener("click", () => {
      chrome.runtime.sendMessage({
        action: "show-highlight",
      });
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

// export async function executeInTab(tabId: any, { file, func, args }: any) {
//   const executions = await chrome.scripting.executeScript({
//     target: { tabId, allFrames: true },
//     ...(file && { files: [file] }),
//     func,
//     args,
//   });

//   if (executions.length == 1) {
//     return executions[0].result;
//   }
//   // If there are many frames, concatenate the results
//   return executions.flatMap((execution) => execution.result);
// }

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

// export async function executeInCurrentTab(opts: any) {
//   const tab = await getCurrentTab();
//   return executeInTab(tab.id, opts);
// }

export const trimUrl = (url: string) => {
  if (url.includes("//")) {
    url = url?.substring(url.indexOf("//") + 2);
  }
  if (url.includes("#")) {
    url = url.substring(0, url.indexOf("#"));
  }
  if (url.includes("?uuid=")) {
    url = url.substring(0, url.indexOf("?uuid="));
  }
  if (url.includes("uuid=")) {
    url = url.substring(0, url.indexOf("uuid="));
  }
  return url;
};

export const extractUUID = (url: string) => {
  const uuidRegex =
    /uuid=([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/;
  const match = url.match(uuidRegex);
  const uuid = match ? match[1] : null;
  return uuid;
};
