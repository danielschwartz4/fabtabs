import { Box, Stack, Image, Flex } from "@chakra-ui/react";
import "@fontsource/molengo";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Entry from "./components/Entry";
import FolderStructure from "./components/FolderStructure/FolderStructure";
import Footer from "./components/Footer";
import HighlightList from "./components/HighlightList";
import Popover from "./components/Popover";
import Search from "./components/Search/Search";
import Title from "./components/Title";
import "./styles/folder.css";
import { DataType } from "./types/types";
import { trimUrl } from "./utils/utils";

interface PopupProps {
  localData: DataType;
}

const Popup: React.FC<PopupProps> = ({ localData }) => {
  const [data, setData] = useState<DataType>();
  const [currentUrl, setCurrentUrl] = useState<string>();
  const [currentTitle, setCurrentTitle] = useState<string>();
  const [currentFavicon, setCurrentFavicon] = useState<string>();
  const [highlightListUrl, setHighlightListUrl] = useState<string>();
  console.log("DATA", data);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let url = tabs[0].url;
      // Incase it's a "link to highlight" url
      if (url) url = trimUrl(url);
      setCurrentUrl(url);
      setHighlightListUrl(url);
      setCurrentTitle(tabs[0].title);
      setCurrentFavicon(tabs[0].favIconUrl);
    });
    setData(localData);
  }, []);

  const handleClick = () => {
    setHighlightListUrl(currentUrl);
  };

  console.log(data);
  return (
    <Stack bgColor={"#F3F2F9"} h={"575px"} padding={".5em"} margin={"-8px"}>
      <Stack
        h={"95%"}
        w={"336px"}
        p={"1em"}
        bgColor={"#F3F2F9"}
        fontFamily={"Molengo"}
        overflow={"hidden"}
      >
        <Search currentUrl={currentUrl} data={data} />
        {currentTitle && currentUrl ? (
          <Box onClick={handleClick}>
            <Box padding={4}>
              <Title text={"current page"} />
            </Box>
            <Flex
              outline={highlightListUrl === trimUrl(currentUrl) ? "solid" : ""}
              outlineColor={
                highlightListUrl === trimUrl(currentUrl) ? "#C1B9F1" : ""
              }
              borderRadius={"4px"}
              fontSize={"14px"}
              textOverflow={"ellipsis"}
              textColor={"#170F47"}
              bgColor={"white"}
              alignItems={"center"}
            >
              <Image ml={"12px"} boxSize={"18px"} src={currentFavicon} alt="" />
              <Entry
                entryUrl={currentUrl}
                currentUrl={currentUrl}
                text={currentTitle}
              />
            </Flex>
          </Box>
        ) : null}
        {data ? (
          <Box border={"2px"} borderColor={"black"}>
            <FolderStructure
              setHighlightListUrl={setHighlightListUrl}
              data={data}
              highlightListUrl={highlightListUrl}
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
            <Box overflow={"scroll"}>
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
      <Footer></Footer>
    </Stack>
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
