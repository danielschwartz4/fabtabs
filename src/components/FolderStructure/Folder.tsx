import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import "../../styles/folder.css";
import { Highlight, NotesType } from "../../types/types";
import { displayNotes } from "../../utils/utils";

interface FolderProps {
  url: string;
  data: {
    highlights: Highlight[];
    title: string;
  };
  handleFolderDelete: (url: string) => void;
}

const Folder: React.FC<FolderProps> = ({ url, data, handleFolderDelete }) => {
  const [shadow, setShadow] = useState<boolean>(false);
  const handleMouseOver = () => {
    setShadow(true);
    let tmp = `<button id="myButton">delete</button> </br> </br>`;
    // let tmp = "";
    tmp += displayNotes(data.highlights);
    const ele = document.getElementById("popover");
    if (ele) {
      ele.innerHTML = tmp;
      ele.style.padding = "8px";
      document
        .getElementById("myButton")
        ?.addEventListener("click", () => handleFolderDelete(url));
    }
  };
  const handleMouseLeave = () => {
    setShadow(false);
  };

  return (
    <Box className="popover__wrapper">
      <a href={url} target="_blank">
        <Box
          style={
            shadow
              ? {
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }
              : {}
          }
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          fontSize={"12px"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
          h={"24px"}
        >
          <Text padding={2} my={"auto"}>
            {data.title}
          </Text>
        </Box>
      </a>
    </Box>
  );
};

export default Folder;
