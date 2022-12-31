import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import "../../styles/folder.css";
import { Highlight } from "../../types/types";
import { displayPopoverHighlights } from "../../utils/utils";

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

    //// Delete
    // let tmp = `<button id="myButton">delete</button> </br> </br>`;

    //// Popover
    // displayPopoverHighlights(data.highlights);
    // const ele = document.getElementById("popover");
    // if (ele) {
    //   ele.innerHTML = tmp;
    //   ele.style.padding = "8px";
    //   document
    //     .getElementById("myButton")
    //     ?.addEventListener("click", () => handleFolderDelete(url));
    // }
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
          bgColor={"white"}
          borderRadius={"4px"}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          fontSize={"14px"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
          padding={"8px"}
          textColor={"#170F47"}
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
