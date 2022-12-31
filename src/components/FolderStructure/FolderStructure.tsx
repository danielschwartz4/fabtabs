import { Box, Text, Stack } from "@chakra-ui/react";
import React from "react";
import "../../styles/folder.css";
import { DataType } from "../../types/types";
import Title from "../Title";
import Folder from "./Folder";

interface FolderStructureProps {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType | undefined>>;
}

const FolderStructure: React.FC<FolderStructureProps> = ({ data, setData }) => {
  const handleFolderDelete = async (url: string) => {
    delete data[url];
    chrome.storage.local.set({ data: data });
    // !! This doesn't work
    setData(data);
    return;
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
          return (
            <Folder
              key={i}
              handleFolderDelete={handleFolderDelete}
              url={data[key].highlights[0].href}
              data={data[key]}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default FolderStructure;
