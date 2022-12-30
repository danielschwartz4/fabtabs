import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import "../../styles/folder.css";
import { DataType } from "../../types/types";
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
      <Flex mb={"1.5em"}>
        <b> Folders:</b>
      </Flex>
      <Stack
        style={{
          boxShadow:
            "rgb(0 0 0 / 80%) 0px 4px 8px 0px, rgb(0 0 0 / 30%) 0px 6px 20px 8px",
        }}
        maxH={"200px"}
        overflow={"scroll"}
        borderRadius={"4px"}
        padding={4}
      >
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
