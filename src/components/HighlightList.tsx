import { Box, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { DataType } from "../types/types";
import Entry from "./Entry";
import Title from "./Title";

interface HighlightListProps {
  data: DataType;
  url: string;
  highlightListUrl: string | undefined;
}

const HighlightList: React.FC<HighlightListProps> = ({
  data,
  url,
  highlightListUrl,
}) => {
  const [update, setUpdate] = useState<boolean>(false);
  const handleFolderDelete = async (uuid: string) => {
    if (!data[url]) return;
    const newHighlights = data[url]["highlights"].filter(function (el) {
      return el.uuid != uuid;
    });
    data[url].highlights = newHighlights;
    chrome.storage.local.set({ tabs: data });
    setUpdate(!update);
  };

  return (
    <>
      {highlightListUrl && data[highlightListUrl] ? (
        <Stack
          overflow={"scroll"}
          maxH={"300px"}
          borderRadius={"4px"}
          padding={4}
        >
          <Title text={"highlights on selected page"} />
          {data[highlightListUrl]["highlights"].map(function (h, i) {
            return (
              <Entry
                key={i}
                text={h.string}
                uuid={h.uuid}
                canClick
                handleFolderDelete={handleFolderDelete}
              />
            );
          })}
        </Stack>
      ) : url && data[url] ? (
        <Stack overflow={"scroll"} borderRadius={"4px"} padding={4}>
          <Title text={"highlights on selected page"} />
          {data[url]["highlights"].map(function (h, i) {
            return (
              <Entry
                key={i}
                text={h.string}
                uuid={h.uuid}
                canClick
                handleFolderDelete={handleFolderDelete}
              />
            );
          })}
        </Stack>
      ) : (
        <Title text="You haven't made any highlights on this page :'(" />
      )}
    </>
  );
};
export default HighlightList;
