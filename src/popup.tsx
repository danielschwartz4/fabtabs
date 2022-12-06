import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import FolderStructure from "./components/FolderStructure/FolderStructure";
import { DataType } from "./types/types";
import { displayNotes } from "./utils";
import "./styles/folder.css";
import Popover from "./components/Popover";

interface PopupProps {
  localData: DataType;
}

const Popup: React.FC<PopupProps> = ({ localData }) => {
  const [data, setData] = useState<DataType>();

  const [currentURL, setCurrentURL] = useState<string>();
  console.log(data);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;
      if (url?.includes("#")) {
        setCurrentURL(url.substring(0, url.indexOf("#")));
      } else {
        setCurrentURL(url);
      }
    });
    setData(localData);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (!currentURL || !data || !data[currentURL]) {
      return;
    }
    const tmp = displayNotes(data[currentURL]["notes"]);
    const ele = document.getElementById("page-notes");
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
    <div style={{ height: "400px", width: "400px" }}>
      <div style={{ display: "flex", marginBottom: "1.5em" }}>FabTabs</div>
      {data ? (
        <FolderStructure setData={setData} data={data} />
      ) : (
        "NO URLs SAVED YET"
      )}
      <Popover />
      <div style={{ marginTop: "16px" }}>
        {data && data[currentURL as string] ? (
          <div>
            Notes:
            <br />
            <div id={"page-notes"} />
          </div>
        ) : (
          "NO NOTES FOR THIS PAGE"
        )}
      </div>
    </div>
  );
};

export default Popup;

chrome.storage.local.get(function (data) {
  ReactDOM.render(
    <React.StrictMode>
      {data && Object.keys(data).length !== 0 ? (
        <Popup localData={data.data} />
      ) : (
        <div style={{ height: "200px", width: "400px" }}>NO DATA SAVED YET</div>
      )}
    </React.StrictMode>,
    document.getElementById("root")
  );
});
