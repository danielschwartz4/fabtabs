import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import FolderStructure from "./components/FolderStructure/FolderStructure";
import { DataType } from "./types/types";
import { displayNotes } from "./utils";

interface PopupProps {
  data: DataType;
}

const Popup: React.FC<PopupProps> = ({ data }) => {
  const [currentURL, setCurrentURL] = useState<string>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;
      if (url?.includes("#")) {
        setCurrentURL(url.substring(0, url.indexOf("#")));
      } else {
        setCurrentURL(url);
      }
    });
  }, []);

  useEffect(() => {
    if (!currentURL) {
      return;
    }
    const tmp = displayNotes(data[currentURL]["notes"]);
    const ele = document.getElementById("notes");
    if (ele) {
      ele.innerHTML = tmp;
    }
  }, [currentURL]);

  chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });

  return (
    <div style={{ height: "200px", width: "400px" }}>
      <div style={{ display: "flex", marginLeft: "auto" }}>FabTabs</div>
      {data ? (
        <FolderStructure data={data}></FolderStructure>
      ) : (
        "NO DATA SAVED YET"
      )}
      <div style={{ marginTop: "16px" }}>
        {data[currentURL as string] ? (
          <div>
            Notes:
            <br />
            <div id={"notes"}></div>
          </div>
        ) : (
          "NO NOTES"
        )}
      </div>
    </div>
  );
};

export default Popup;

chrome.storage.local.get(function (data) {
  console.log(data);
  ReactDOM.render(
    <React.StrictMode>
      <Popup data={data.data} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
