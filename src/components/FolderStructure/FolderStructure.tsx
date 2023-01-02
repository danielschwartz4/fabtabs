import { Box, Button, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../../styles/folder.css";
import { DataType } from "../../types/types";
import Title from "../Title";
import Folder from "./Folder";

interface FolderStructureProps {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType | undefined>>;
}

const FolderStructure: React.FC<FolderStructureProps> = ({ data, setData }) => {
  const [update, setUpdate] = useState<boolean>(false);
  const handleFolderDelete = async (url: string) => {
    console.log(data);
    url = url?.substring(url.indexOf("//") + 2);
    setUpdate(!update);
    delete data[url];

    chrome.storage.local.set({ tabs: data });
  };

  useEffect(() => {
    setData(data);
  }, []);

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
