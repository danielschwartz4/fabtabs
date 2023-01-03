import { Box, Stack } from "@chakra-ui/react";
import "@fontsource/molengo";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Entry from "./components/Entry";
import FolderStructure from "./components/FolderStructure/FolderStructure";
import HighlightList from "./components/HighlightList";
import Popover from "./components/Popover";
import Search from "./components/Search/Search";
import Title from "./components/Title";
import "./styles/folder.css";
import { DataType } from "./types/types";

interface PopupProps {
  localData: DataType;
}

const Popup: React.FC<PopupProps> = ({ localData }) => {
  const [data, setData] = useState<DataType>();
  const [currentUrl, setCurrentUrl] = useState<string>();
  const [currentTitle, setCurrentTitle] = useState<string>();
  const [highlightListUrl, setHighlightListUrl] = useState<string>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let url = tabs[0].url;
      // Incase it's a "link to highlight" url
      if (url?.includes("#")) {
        url = url.substring(0, url.indexOf("#"));
      }
      url = url?.substring(url.indexOf("//") + 2);
      setCurrentUrl(url);
      setCurrentTitle(tabs[0].title);
    });
    setData(localData);
  }, []);

  const handleClick = () => {
    console.log("clicked");
    console.log("A");
    console.log(currentUrl);
    setHighlightListUrl(currentUrl);
    console.log(currentUrl);
    console.log(data);
  };

  return (
    <Box padding={".5em"} margin={"-8px"}>
      <Stack
        h={"567px"}
        w={"336px"}
        m={"-8px"}
        p={"1em"}
        bgColor={"#F3F2F9"}
        fontFamily={"Molengo"}
        overflow={"hidden"}
      >
        <Search currentUrl={currentUrl} data={data} />
        {currentTitle ? (
          <Box onClick={handleClick}>
            <Box padding={4}>
              <Title text={"current page"} />
            </Box>
            <Entry text={currentTitle} />
          </Box>
        ) : null}
        {data ? (
          <Box border={"2px"} borderColor={"black"}>
            <FolderStructure
              highlightListUrl={highlightListUrl}
              setHighlightListUrl={setHighlightListUrl}
              data={data}
            />
          </Box>
        ) : (
          <Box padding={4}>
            <Title text={"You haven't saved any urls yet :'("} />
          </Box>
        )}
        <Popover />
        <Box>
          {currentUrl && data ? (
            <Box h={"200px"} overflow={"scroll"}>
              <HighlightList
                data={data}
                url={currentUrl}
                highlightListUrl={highlightListUrl}
              />
            </Box>
          ) : (
            <Title text="You haven't made any highlights on this page :'(" />
          )}
        </Box>
      </Stack>
      {/* <Footer></Footer> */}
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
          <Title text="Nothing Highlighted Yet :(" />
        </Box>
      )}
    </React.StrictMode>,
    document.getElementById("root")
  );
});
