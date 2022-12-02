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
  const [notes, setNotes] = useState<string>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
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
      <FolderStructure data={data}></FolderStructure>
      <div>
        {data[currentURL as string] ? <div id={"notes"}></div> : "NO NOTES"}
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
