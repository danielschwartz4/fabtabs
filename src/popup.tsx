import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import FolderStructure from "./components/FolderStructure/FolderStructure";
import { DataType } from "./types/types";
import { displayNotes } from "./utils/utils";
import "./styles/folder.css";
import Popover from "./components/Popover";
import { Box } from "@chakra-ui/react";

interface PopupProps {
  localData: DataType;
}

const Popup: React.FC<PopupProps> = ({ localData }) => {
  const [data, setData] = useState<DataType>();
  const [currentUrl, setCurrentUrl] = useState<string>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let url = tabs[0].url;
      console.log("first url", url);
      // Incase it's a "link to highlight" url
      if (url?.includes("#")) {
        url = url.substring(0, url.indexOf("#"));
      }
      url = url?.substring(url.indexOf("//") + 2);
      setCurrentUrl(url);
    });
    setData(localData);
  }, []);

  useEffect(() => {
    console.log("FIRST");
    console.log(currentUrl, data);
    if (!currentUrl || !data || !data[currentUrl]) {
      return;
    }
    console.log("data[currentUrl]", data[currentUrl]);
    const tmp = displayNotes(data[currentUrl]["highlights"]);
    const ele = document.getElementById("page-notes");
    if (ele) {
      ele.innerHTML = tmp;
    }
  }, [currentUrl, data]);

  chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });

  return (
    <Box
      h={"400px"}
      w={"400px"}
      padding={".5em"}
      outline={"2px"}
      outlineColor={"black"}
    >
      <hr style={{ marginBottom: "1.5em", marginTop: "1.5em" }} />
      {data ? (
        <Box border={"2px"} borderColor={"black"}>
          <FolderStructure setData={setData} data={data} />
        </Box>
      ) : (
        "NO URLs SAVED YET"
      )}
      <Popover />
      <hr style={{ marginBottom: "1.5em", marginTop: "1.5em" }} />
      <Box mt={"16px"}>
        {currentUrl && data && data[currentUrl] ? (
          <Box>
            <b>Notes:</b>
            <br />
            <br />
            <Box maxH={"200px"} overflow={"scroll"} id={"page-notes"} />
          </Box>
        ) : (
          "NO NOTES FOR THIS PAGE"
        )}
      </Box>
    </Box>
  );
};

export default Popup;

chrome.storage.local.get(function (data) {
  ReactDOM.render(
    <React.StrictMode>
      {data && Object.keys(data).length !== 0 ? (
        <Popup localData={data.tabs} />
      ) : (
        <Box h={"200px"} w={"400px"}>
          NO DATA SAVED YET
        </Box>
      )}
    </React.StrictMode>,
    document.getElementById("root")
  );
});
