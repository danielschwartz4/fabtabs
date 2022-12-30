import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import FolderStructure from "./components/FolderStructure/FolderStructure";
import { DataType } from "./types/types";
import { displayMainHighlights } from "./utils/utils";
import "./styles/folder.css";
import Popover from "./components/Popover";
import { Box, Input } from "@chakra-ui/react";
import SearchBar from "./components/Search/SearchBar";
import Results from "./components/Search/Results";
import Search from "./components/Search/Search";

interface PopupProps {
  localData: DataType;
}

const Popup: React.FC<PopupProps> = ({ localData }) => {
  const [data, setData] = useState<DataType>();
  const [currentUrl, setCurrentUrl] = useState<string>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let url = tabs[0].url;
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
    if (!currentUrl || !data || !data[currentUrl]) {
      return;
    }
    displayMainHighlights(data[currentUrl]["highlights"]);
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
      <Search data={data}></Search>
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
            <b>{data[currentUrl].title}</b> Highlights
            <br />
            <br />
            <Box maxH={"200px"} overflow={"scroll"} id={"highlight-list"} />
          </Box>
        ) : (
          "You haven't made any highlights on this page :'("
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
          Nothing Highlighted Yet :(
        </Box>
      )}
    </React.StrictMode>,
    document.getElementById("root")
  );
});
