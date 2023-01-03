import { Box, Flex, Link, Text, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { MdOutlineOpenInNew } from "react-icons/md";
import "../../styles/folder.css";
import { Highlight, PageGroup } from "../../types/types";
import { trimUrl } from "../../utils/utils";

interface FolderProps {
  url: string;
  data: PageGroup;
  handleFolderDelete: (url: string) => void;
  setHighlightListUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  highlightListUrl: string | undefined;
}

const Folder: React.FC<FolderProps> = ({
  url,
  data,
  handleFolderDelete,
  setHighlightListUrl,
  highlightListUrl,
}) => {
  const [shadow, setShadow] = useState<boolean>(false);

  const handleMouseOver = () => {
    setShadow(true);
  };
  const handleMouseLeave = () => {
    setShadow(false);
  };

  const handleClick = () => {
    url = trimUrl(url);
    setHighlightListUrl(url);
  };

  return (
    <Flex
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
      onClick={handleClick}
      fontSize={"14px"}
      textOverflow={"ellipsis"}
      padding={"8px"}
      textColor={"#170F47"}
      justify={"space-between"}
      alignItems={"center"}
      outline={highlightListUrl === trimUrl(url) ? "solid" : ""}
      outlineColor={highlightListUrl === trimUrl(url) ? "#C1B9F1" : ""}
      gap={"8px"}
    >
      <Image
        // w={"18px"}
        boxSize={"18px"}
        src={data.favicon}
        alt=""
      />
      <Text
        padding={2}
        my={"auto"}
        width={"260px"}
        // overflow={"hidden"}
        // textOverflow={"ellipsis"}
        cursor={"pointer"}
        isTruncated
      >
        {data.title}
      </Text>
      <Link mt={"3.5px"} href={url} target="_blank">
        <MdOutlineOpenInNew color="grey" cursor={"pointer"} />
      </Link>
      <GrClose
        onClick={() => handleFolderDelete(url)}
        color="grey"
        opacity={"50%"}
        cursor={"pointer"}
      />
    </Flex>
  );
};

export default Folder;
