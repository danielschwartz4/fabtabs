import { Box, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../../styles/folder.css";
import { DataType } from "../../types/types";
import { trimUrl } from "../../utils/utils";
import Title from "../Title";
import Folder from "./Folder";

interface FolderStructureProps {
  data: DataType;
  setHighlightListUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  highlightListUrl: string | undefined;
}

const FolderStructure: React.FC<FolderStructureProps> = ({
  data,
  setHighlightListUrl,
  highlightListUrl,
}) => {
  const [update, setUpdate] = useState<boolean>(false);
  const handleFolderDelete = async (url: string) => {
    url = trimUrl(url);
    setUpdate(!update);
    delete data[url];
    chrome.storage.local.set({ tabs: data });
  };

  return (
    <Box>
      <Stack
        maxH={"300px"}
        overflow={"scroll"}
        borderRadius={"4px"}
        padding={4}
      >
        <Title text="pages with highlights:" />
        {Object.keys(data).map(function (key, i) {
          if (data[key].highlights.length === 0) return;
          return (
            <Folder
              key={i}
              handleFolderDelete={handleFolderDelete}
              url={data[key].highlights[0].href}
              data={data[key]}
              setHighlightListUrl={setHighlightListUrl}
              highlightListUrl={highlightListUrl}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default FolderStructure;
